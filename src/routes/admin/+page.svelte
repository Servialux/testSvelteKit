<script lang='ts'>
import { onMount } from "svelte";
import { tableMapperValues, tableSourceValues, Table } from '@skeletonlabs/skeleton';
import { pageTitle } from "$lib/stores/themeStore";
import  FormBuilder  from "$lib/formBuilder.svelte";
import Icon from '@iconify/svelte';
import type { TableOfContents, TableSource,  } from "@skeletonlabs/skeleton";

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
		console.log('page', postData);
		try {
			const res = await fetch('/admin/function/', { 
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(postData)
			});
			const data = await res.json();
			console.log(data);
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

