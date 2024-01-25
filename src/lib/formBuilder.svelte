<script lang="ts">
    
import { createEventDispatcher } from 'svelte';
import { createForm } from 'svelte-forms-lib';
import { Form, Field } from "svelte-forms-lib";
import { object, string, number, date } from 'yup';

import shopSchema from './models/shopsValidator';

import type { InferType } from 'yup';

    export let data: FormData = {} as FormData;
    const dispatch = createEventDispatcher();
    
    // Interface pour chaque type de champ
    interface FormField {
        title: string;
        fieldName: string;
        label: string;
        type: string;
        value?: string;
        rows?: number;
        option?: { [key: string]: boolean };
        multiple?: boolean;
        shim?: boolean;
    }

    // Interface pour les données du formulaire
    interface FormData {
        title: string;
        [key: string]: FormField | string;
    }
    console.log(data);
    // Création du schéma de validation
    // const { form, errors, state, handleChange } = createForm({
    //   initialValues: ,
    // });
    // Récupération des donnés du formulaire
	function handleSubmit(event: Event) {
        event.preventDefault();
        console.log(event.target);
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        dispatch('submit', data);
	}
</script>

{#if Object.keys(data).length > 0}
    <form id="formBuilder" method="POST"  on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
        {#if data.title}<h2>{data.title}</h2>{/if}
        {#each Object.entries(data) as [key, field]}
            {#if typeof field !== 'string'}
                    <label class="label" for={key}>{field.label}</label>
                {#if field.type === 'text'}
                    <input type="text" class="input" name={field.fieldName} id={key} value={field.value || ''} />
                {/if}
                
                {#if field.type === 'select' && field.option}
                    <select class="select" name={field.fieldName} id={key}>
                        {#each Object.entries(field.option) as [index, option]}
                            <option value={index} selected={option}>{option}</option>
                        {/each}
                    </select>
                {/if}

                {#if field.type === 'textarea'}
                    <textarea id={key} rows={field.rows || 3} name={field.fieldName} value={field.value || ''}></textarea>
                {/if}
                {#if field.type === 'checkbox' && field.option}
                    {#each Object.entries(field.option) as [index, option]}
                        {#each Object.entries(option) as [key, value]}
                            <label class="flex items-center space-x-2">
                                <input class="checkbox" name={field.fieldName} type="checkbox" bind:checked={value} />
                                <p>{key}</p>
                            </label>
                        {/each}
                    {/each}
                {/if}
                {#if field.type === 'tel'}
                    <input class="input" type="tel" name={field.fieldName} id={key} value={field.value || ''}  placeholder="+352 123 456 789"/>
                {/if}
                {#if field.type === 'email'}
                    <input class="input" type="email" name={field.fieldName} id={key} value={field.value || ''} placeholder="john@example.com" autocomplete="email" />
                {/if}
                {#if field.type === 'url'}
                    <input class="input" type="url" name={field.fieldName} id={key} value={field.value || ''} />
                {/if}
                {#if field.type === 'radio' && field.option}
                    {#each Object.entries(field.option) as [index, option]}
                            <label class="flex items-center space-x-2">
                                <input class="radio"  type="radio" name={field.fieldName} value="{index}" />
                                <p>{option}</p>
                            </label>
                    {/each}
                {/if}
                {#if field.type === 'file'}
                    <input class="input" name={field.fieldName} type="file" id={key} multiple />
                {/if}
                {#if field.type === 'date'}
                    <input class="input" name={field.fieldName} type="date" id={key} />
                {/if}
                {#if field.type === 'month'}
                    <input class="input" name={field.fieldName} type="month" id={key} />
                {/if}
            {/if}
        {/each}
        <button class="btn bg-primary-500 mt-2" type="submit">Envoyer</button>
    </form>
{:else}
    <p class="text-center">Il n'y a pas de données pour générer le formulaire.</p>
{/if}
    