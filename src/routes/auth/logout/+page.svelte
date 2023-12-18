<script lang="ts">
import { getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { pageTitle, hideMenu } from "$lib/stores/themeStore";
import Icon from '@iconify/svelte';
import { goto } from '$app/navigation';
import { onMount } from "svelte";
import { logoutUserAuth } from '$lib/stores/userStore';
export let data;


onMount(() => {
    pageTitle.set('Deconnexion');
    hideMenu();
    logoutUserAuth();
});
let countdown = 5;
const toastStore = getToastStore();
    const t: ToastSettings = {
        message: data.props.toastMessage,
        autohide: false,
    };
    toastStore.trigger(t);

const interval = setInterval(() => {
        countdown -= 1;
        if (countdown === 0) {
            clearInterval(interval);
            goto('/');
        }
    }, 1000);

</script>
<div class="mt-8 w-full flex items-stretch justify-center">
    <div class="self-center flex flex-col justify-center">
        <h1 class="h1 text-center"> Vous êtes deconnecté avec succès </h1>
        <button class="btn btn-lg self-center mt-6 text-center w-fit bg-primary-500" on:click={() => window.location.href = '/'}> <Icon icon="material-symbols:arrow-back" />Retour à l'accueil ( {countdown} )</button>
    </div>
</div>

