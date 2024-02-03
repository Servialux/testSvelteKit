<script lang='ts'>
import { onMount } from "svelte";
import { tableMapperValues, tableSourceValues, Table, getToastStore } from '@skeletonlabs/skeleton';
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import { pageTitle } from "$lib/stores/themeStore";
import  FormBuilder  from "$lib/formBuilder.svelte";
import Icon from '@iconify/svelte';
import type { TableOfContents, TableSource, ToastSettings,  } from "@skeletonlabs/skeleton";
  import type internal from "stream";

	const toastStore = getToastStore();
	let error: any;
    onMount(async () => {
		pageTitle.set('Dashboard');
	});

	interface ShopsType {
		id: string,
		VATNumber: string,
		address: string,
		colorTheme: string,
		country: string,
		email:  string,
		imageFile:  string,
		imageName:  string,
		imageSize: number,
		isActive:  boolean,
		logoFile:  string,
		logoName:  string,
		logoSize: number,
		name:  string,
		phoneNumber:  string,
		shopType:  string,
		updatedAt:  string,
		website: string,
		zipCode: string 
	}

	interface MultiShopsType {
		[key: string]: [key: ShopsType | any]
	}

	export let data;
	let formData: any = {};
	let showCreate = true;
	let shops: MultiShopsType = {};
	let isShops = false;
	let showForm = false;

	shops = data.props.shops;
	if(Object.keys(shops).length > 0){
		showCreate = false;
		isShops = true;
	}else{
		showCreate = true;
		isShops = false;
	}

	console.log(shops);


	function selectShop(id: string){
		goto('/admin/shops/' + id);
	}

	function toggleCreate(){
		formData = data.props.formCreate;
		showCreate = !showCreate;
		showForm = !showForm;
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
				showCreate = false;
				showForm = false;
			} catch (error) {
				console.error(error);
			}
		}
</script>
{#if !showCreate && !isShops }
<div class="w-screen flex flex-col justify-center items-center p-2">
	<h2 class="h2 text-center mt-2">Vos boutique</h2>
	<p class="text-center"> Vous n'avez actuelement aucune boutique appuyer pour créer la première</p>
	<button on:click={() => toggleCreate()} class="w-24 h-24 bg-primary-600 rounded-full mt-4 flex items-center justify-center">
		<p class="inset-0 text-4xl font-bold"><Icon icon="streamline:add-1" /></p>
	</button>
</div>
{/if}

{#if isShops && !showCreate}
<div class="w-screen flex flex-col justify-center items-center p-2">
	<h2 class="h2 text-center mt-2">Vos boutique</h2>
	<div class="table-container p-6">
		<table class="table table-compact">
			<thead>
				<tr>
					<th class="hidden lg:block">Position</th>
					<th>Name</th>
					<th class="hidden md:flex">type</th>
					<th>En ligne</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.entries(shops) as [shopKey, shop]}
				<tr on:click={() => selectShop(shop.id)}>
				  <td class="hidden lg:block">{shopKey}</td>
				  <td>{shop.name != null ? shop.name : ''}</td>
				  <td class="hidden md:flex">{shop.shopType != null ? shop.shopType : ''}</td>
				  <td>{shop.isActive ? 'Activée' : 'Inactive'}</td>
				</tr>
			  {/each}
			</tbody>
			<tfoot>
				<tr>
					<th >Total</th>
					<td>{Object.keys(shops).length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div class=" flex flex-col items-center p-6 w-full">
		<h3>Ajouter une boutique</h3>
		<button on:click={() => toggleCreate()} class="w-24 h-24 bg-primary-600 rounded-full mt-4 flex items-center justify-center">
			<p class="inset-0 text-4xl font-bold"><Icon icon="streamline:add-1" /></p>
		</button>
	</div>
</div>
{/if}
{#if showForm}
<div class="w-full flex flex-nowrap justify-end place-items-center mx-4 h-auto">
	<p class="text-left grow h-full min-h-max text-3xl font-extralight italic text-wrap">Formulaire de création</p>
	<button on:click={() => toggleCreate()} class="bg-primary-600 mr-6 min-h-max h-full w-12 aspect-[1/1] flex items-center justify-center">
		<p class="inset-0 text-4xl font-bold"><Icon icon="ic:round-arrow-left" /></p>
	</button>
</div>
	<div class="p-3 mt-2 md:card">
		{#if Object.keys(formData).length > 0}
			<FormBuilder data={formData} on:submit={handleFormSubmit} />
		{/if}
	</div>
{/if}


