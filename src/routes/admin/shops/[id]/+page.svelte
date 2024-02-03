<script lang='ts'>
import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import Icon from '@iconify/svelte';
    
    export let data: any;

    const toastStore = getToastStore();
    let t: ToastSettings;
   
    let shop = data.props.shop;
    let headForm = false;   
    let descriptionForm = false;
    let addressForm = false;
    let typeForm = false;
    let contactForm = false;

    
    
    console.log(shop);


    async function toggleShopStatus() {
        shop.isActive = !shop.isActive;
        let response = await fetch(`/admin/shops/${shop.id}/updateShop`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isActive: shop.isActive})
        })
        if (response.ok) { // Si le statut est 200-299
            let message= await response.json(); 
            shop = message; 
            t = {
	            message: 'Le statut de la boutique a été modifié avec succès',
            };
        } else {
            let message = await response.text(); 
            t = {
                message: message,
            };
        }
        toastStore.trigger(t);
    }

    function toggleHeadForm() {
        headForm = !headForm;
        console.log(shop);
    }

    async function updateShop(){
        console.log('updsaate with',shop);
        let response = await fetch(`/admin/shops/${shop.id}/updateShop`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shop)
        })
        if (response.ok) { // Si le statut est 200-299
            let message= await response.json(); 
            shop = message; 
            t = {
                message: 'Le statut de la boutique a été modifié avec succès',
            };
            headForm = false;
        } else {
            let message = await response.text(); 
            t = {
                message: message,
            };
            console.log(message);
        }
        toastStore.trigger(t);
    }


</script>
<div class="card">
    <div  class="flex flex-col items-center mt-2">
        {#if shop.isActive}
            <p class="text-center font-bold h-full flex-grow mt-1">La boutique est:</p>
            <div class="flex items-center gap-2 tex">
                <!-- <Icon icon="icon-park-solid:press" width="1.2rem" height="1.2rem" /> -->
                <button type="button" class="btn variant-ghost-success mt-2" on:click={toggleShopStatus}>
                    <strong class="text-success-500">En ligne</strong>
                </button>
            </div>
        {:else}
            <p class="text-center font-bold h-full flex-grow mt-1">La boutique est:  </p>
            <div class="flex items-center gap-2">
                <Icon icon="icon-park-solid:press" width="1.2rem" height="1.2rem" />
                <button type="button" class="btn variant-ghost-warning mt-2" on:click={toggleShopStatus}>
                    <strong class="text-warning-500">Hors Ligne</strong>
                </button>
            </div>
        {/if}
    </div>
	<header class="card-header">
        <img alt={shop.imageName} src={shop.imageFile} />
        <hr class="!border-t-8 !border-double mt-6" />
        {#if headForm}
            <h2 class="h2 text-primary-500 mt-2">Nom & Logo</h2>
            <form action="" method="" class="flex flex-wrap mt-4 gap-2 p-2">
                <div>
                    <label for="logo">Logo de la boutique</label>
                    <input class="input" type="file" bind:files={shop.logoFile}/>
                </div>
                <div >
                    <label for="name">Nom de la boutique</label>
                    <input class="input" title="Input (text)" type="text" placeholder="input text" bind:value={shop.name} />
                </div>
                <div class="flex flex-wrap w-full items-center mt-1">
                    <button on:click={updateShop} type="button" class="btn variant-filled-success">Modifier</button>
                    <div  class="items-end flex-1 flex flex-row-reverse">
                        <button on:click={toggleHeadForm}>
                            <Icon icon="mdi:cancel-circle" width="2.2rem" height="2.2rem" class="text-error-400"  />
                        </button>
                    </div>
                </div>
            </form>
        {:else}
        <div class="flex mt-6 items-center p-2">
            <img alt={shop.logoName} src={shop.logoFile} width="70" height="70" class="rounded-lg" />
            <h1 class="h1 title uppercase text-center flex-grow">{shop.name}</h1>
            <button on:click={toggleHeadForm}>
                <Icon icon="fa-solid:pen-square" width="30" height="30" />
            </button>
        </div>
        {/if}
        <hr class="!border-dashed mt-6"  />
    </header>
	<section class="p-4">
        <div class="mt-2">
            <div class="flex gap-2">
                <h2 class="h3 text-primary-500 ">Description</h2> 
                <Icon class="mt-1 text-primary-800" icon="pepicons-pencil:pen" width="1.2rem" height="1.2rem" />
            </div>
            <p class="text-justify p-4 font-thin">{shop.description}</p>
        </div>
        <div class="mt-2">
            <div class="flex gap-2">
                <h2 class="h3 text-primary-500 ">Adresse</h2> 
                <Icon class="mt-1 text-primary-800" icon="pepicons-pencil:pen" width="1.2rem" height="1.2rem" />
            </div>
            <p class="text-justify p-4 font-thin">
                {shop.address}<br />
                {shop.zipCode} {shop.city}<br />
                {shop.country}
            </p>
            <div class="flex gap-2">
                <h2 class="h3 text-primary-500 ">Type</h2> 
                <Icon class="mt-1 text-primary-800" icon="pepicons-pencil:pen" width="1.2rem" height="1.2rem" />
            </div>
            <p class="text-justify p-4 font-thin">{shop.shopType}</p>
        </div>
    </section>
    <hr class="!border-dashed mt-2 px-6"  />
	<footer class="card-footer mt-4 font-thin text-center text-sm text-gray-500">
        <div class="flex items-center">
            <div class="flex flex-col flex-grow">
                <p >{shop.name} - {shop.VATNumber} </p>
                <a href={shop.website}>{shop.website}</a>
                <p>{shop.phoneNumber} | {shop.email}</p>
            </div>
            <Icon class="mt-1 text-primary-100" icon="pepicons-pencil:pen" width="1.2rem" height="1.2rem" />
        </div>
    </footer>
</div>

