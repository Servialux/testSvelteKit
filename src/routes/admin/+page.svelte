<script lang='ts'>
import { onMount } from "svelte";
import { tableMapperValues, tableSourceValues, Table } from '@skeletonlabs/skeleton';
import { pageTitle } from "$lib/stores/themeStore";
import  FormBuilder  from "$lib/formBuilder.svelte";
import type { TableOfContents, TableSource,  } from "@skeletonlabs/skeleton";



    onMount(async () => {
		pageTitle.set('Dashboard');
	});

	export let data;
	let formData: any = { 'title': 'Ceci est un titre de formulaire', 
							0: {'title': 'test',
								'label': 'Input', 
								'type': 'text', 
								'value': 'Ceci est un text de test poour un input text',
								'shim': false,
							},
							
							1: {'title': 'test2', 
								'label': 'Select', 
								'type': 'select', 
								'option': {
									0: {'Option 1': true},
									2: {'Option 2': false},
									3: {'Option 3': false},
								},
								'shim': false,
							},

							2: {'title': 'test3', 
								'label': 'Textaera', 
								'type': 'textaera', 
								'value': 'Ceci est un text de test poour un input text',
								'rows': 5,},

							3: {'title': 'test4', 
								'label': 'Checkbox', 
								'type': 'checkbox', 
								'option': {
									0: {'Option 1': false},
									1: {'Option 2': true},
									2: {'Option 3': false}
								},
								'shim': false,
							},

							4: {'title': 'test5', 
								'label': 'Radio', 
								'type': 'radio', 
								'option': {
									0: {'Option 1': false},
									1: {'Option 2': true},
									2: {'Option 3': false}
								},
								'shim': false,
							},
							5: {'title': 'test6', 
								'label': 'file', 
								'type': 'file', 
								'multiple': true,
								'shim': false,
							},
							6: {'title': 'test7', 
								'label': 'Date', 
								'type': 'date', 
								'shim': false,
							},
							7: {'title': 'test8', 
								'label': 'Month', 
								'type': 'month', 
								'shim': false,
							},
					};
	let tableSimple: TableSource;
	let sourceData: Array<any> = [];

	if(data.props.data.lenght <= 0){

	};

	function toggleCreate(){
		console.log('toggle');
	};
</script>
<div class="w-screen flex flex-wrap justify-center">
	<h2 class="h2 text-center mt-2">Créer votre premiere boutique</h2>
	<button on:click={() => toggleCreate()} class="w-24 h-24 bg-primary-600 rounded-full mt-4"><p class="text-4xl text-center font-bold">+</p></button>
</div>

<div class="p-3">
	{#if Object.keys(formData).length > 0}
		<FormBuilder data={formData} />
	{/if}
</div>
