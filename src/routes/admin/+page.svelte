<script lang='ts'>
import { onMount } from "svelte";
import { tableMapperValues, tableSourceValues, Table, getToastStore } from '@skeletonlabs/skeleton';
import { pageTitle } from "$lib/stores/themeStore";
import  FormBuilder  from "$lib/formBuilder.svelte";
import Icon from '@iconify/svelte';
import type { TableOfContents, TableSource, ToastSettings,  } from "@skeletonlabs/skeleton";

const toastStore = getToastStore();
	let error: any;
    onMount(async () => {
		pageTitle.set('Dashboard');
	});

	export let data;
	let formData: any = {};
	let showCreate = false;

	function toggleCreate(){
		formData = data.props.formCreate;
		showCreate = !showCreate;
		if(showCreate){
			pageTitle.set('Boutiques');
		}else{
			pageTitle.set('Dashboard');
		}
	};
	async function handleFormSubmit(event: any) {
		const postData = event.detail;
		let bodyData = new FormData();
		for(let key in postData) {
            if(key == 'logoFile' || key == 'imageFile') {
                bodyData.append(key, postData[key], postData[key].name);
            } else {
                if(postData[key] === "1" || postData[key] === "0") {
                    postData[key] = postData[key] === "0";
                } else {
                    postData[key] = postData[key];
                }
            }
        }

		bodyData.append("data", JSON.stringify(postData));
			try {
				console.log('send request');
				const res = await fetch('/admin/function/', { 
					method: 'POST', 
					body: bodyData
				});
				const statusCode  =  res;
				const response = await res.json();
				let message:string;
				let background: string;

				if(statusCode.ok){
					background = 'variant-filled-success';
					message = 'Boutique créer avec succès '+response.id;
				} else {
					background = 'variant-filled-error';
					message = 'Une erreur est survenue '+JSON.stringify(response); 
				}
				const t: ToastSettings = {
					message: message,
					background: background,		
				}
				toastStore.trigger(t);
			} catch (error) {
				console.error(error);
			}
		}
</script>

	<div class="w-screen flex flex-col justify-center items-center p-2">
		{#if !showCreate}
		<h2 class="h2 text-center mt-2">Vos boutique</h2>
		<p class="text-center"> Vous n'avez actuelement aucune boutique appuyer pour créer la première</p>
		<button on:click={() => toggleCreate()} class="w-24 h-24 bg-primary-600 rounded-full mt-4 flex items-center justify-center">
			<p class="inset-0 text-4xl font-bold"><Icon icon="streamline:add-1" /></p>
		</button>
			{:else}
			<div class="w-full flex flex-nowrap justify-end place-items-center mx-4 h-auto">
				<p class="text-left grow h-full min-h-max text-3xl font-extralight italic text-wrap">Formulaire de création</p>
				<button on:click={() => toggleCreate()} class="bg-primary-600 mr-6 min-h-max h-full w-12 aspect-[1/1] flex items-center justify-center">
					<p class="inset-0 text-4xl font-bold"><Icon icon="ic:round-arrow-left" /></p>
				</button>
			</div>
		{/if}
	</div>
{#if showCreate}
	<div class="p-3 mt-2 md:card">
		{#if Object.keys(formData).length > 0}
			<FormBuilder data={formData} on:submit={handleFormSubmit} />
		{/if}
	</div>
{/if}

