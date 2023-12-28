<script lang="ts">
    import { onMount } from "svelte";
  
    export let data: FormData = {} as FormData;

    // Interface pour chaque type de champ
    interface FormField {
        title: string;
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
</script>
  
{#if Object.keys(data).length > 0}
    <form>
        {#if data.title}<h2>{data.title}</h2>{/if}
        {#each Object.entries(data) as [key, field]}
            {#if typeof field !== 'string'}
                    <label class="label" for={key}>{field.label}</label>

                {#if field.type === 'text'}
                    <input type="text" class="input" id={key} value={field.value || ''} />
                {/if}
                
                {#if field.type === 'select' && field.option}
                    <select class="select" id={key}>
                        {#each Object.entries(field.option) as [index, option]}
                            {#each Object.entries(option) as [key, value]}
                                <option value={key} selected={value}>{key}</option>
                            {/each}
                        {/each}
                    </select>
                {/if}
                {#if field.type === 'textarea'}
                    <textarea id={key} rows={field.rows || 3} value={field.value || ''}></textarea>
                {/if}
                {#if field.type === 'checkbox' && field.option}
                    {#each Object.entries(field.option) as [index, option]}
                        {#each Object.entries(option) as [key, value]}
                            <label class="flex items-center space-x-2">
                                <input class="checkbox" type="checkbox" bind:checked={value} />
                                <p>{key}</p>
                            </label>
                        {/each}
                    {/each}
                {/if}
                {#if field.type === 'radio' && field.option}
                    {#each Object.entries(field.option) as [index, option]}
                        {#each Object.entries(option) as [key, value]}
                            <label class="flex items-center space-x-2">
                                <input class="radio" type="radio"   name="radio-direct" value="{value}" />
                                <p>{key}</p>
                            </label>
                        {/each}
                    {/each}
                {/if}
                {#if field.type === 'file'}
                    <input class="input" type="file" id={key} multiple />
                {/if}
                {#if field.type === 'date'}
                    <input class="input" type="date" id={key} />
                {/if}
                {#if field.type === 'month'}
                    <input class="input" type="month" id={key} />
                {/if}
            {/if}
        {/each}
        <button class="btn bg-primary-500 mt-2" type="submit">Envoyer</button>
    </form>
{:else}
    <p>Il n'y a pas de données pour générer le formulaire.</p>
{/if}
    