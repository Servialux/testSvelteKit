<script lang='ts'>
import { pageTitle } from "$lib/stores/themeStore";
import { onMount } from "svelte";
import Icon from '@iconify/svelte';
import { Stepper, Step, InputChip, ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';


	export let data: any;
	console.log(data);
	let images: Array<any> = [];
	const modalStore = getModalStore();
	onMount(async () => {
		pageTitle.set('Accueil');
	});

// Création du caroussel
let carousselElem: HTMLDivElement;

function multiColumnLeft(): void {
	let x = carousselElem.scrollWidth;
	if (carousselElem.scrollLeft !== 0) x = carousselElem.scrollLeft - carousselElem.clientWidth;
	carousselElem.scroll(x, 0);
}
function multiColumnRight(): void {
	let x = 0;
	// -1 is used because different browsers use different methods to round scrollWidth pixels.
	if (carousselElem.scrollLeft < carousselElem.scrollWidth - carousselElem.clientWidth - 1) x = carousselElem.scrollLeft + carousselElem.clientWidth;
	carousselElem.scroll(x, 0);
}

//prè chargement d'exemple 
let flavorsWhitelist = ['vanilla', 'chocolate', 'strawberry', 'peach', 'rocky road', 'frais', 'sucré'];
let flavorList =  ['vanilla', 'chocolate', 'strawberry', 'peach', 'rocky road', 'frais', 'sucré'];
// Définitio modal exemple
const modal: ModalSettings = {
	type: 'confirm',
	// Data
	title: 'Voici ce que je vous conseil',
	body: 'Je vous recommande le gout sucré et frais',
	// TRUE if confirm pressed, FALSE if cancel pressed
	response: (r: boolean) => console.log('response:', r),
};

function openModal() {
	modalStore.trigger(modal);
}
</script>
<div class="mt-6">
	<div class="flex flex-col justify-center">
		<span class="badge w-fit self-center shadow-lg shadow-tertiary-400 bg-gradient-to-r from-primary-500 to-secondary-600">PayeTonMenu V0.1 Beta</span>
		<div class="mt-2 flex flex-col">
			<h1 class="h1 text-center text-secondary-200 capitalize">Paye Ta Saveur <p class="h2 text-tertiary-600">Votre guide gustatif personnalisé</p></h1>
			<p class="self-center text-center mt-2 w-2/3 ">
			Explorez un monde de saveurs avec Paye Ta Saveur. Notre IA s'adapte à vos goûts pour vous recommander les meilleurs choix à chaque saison.
			</p>
		</div>
		<button class="btn btn-lg self-center mt-6 text-center w-fit bg-primary-500" on:click={() => window.location.href = '/auth'}>Essayer Maintenant <br> <Icon icon="mingcute:finger-tap-fill" width="32"/></button>
	</div>
	<div class="card mt-6 flex flex-col items-center bg-secondary-500">
		<header class="card-header">
			<h2 class="h2 mt-2 text-center text-tertiary-600">Une histoire de saveurs</h2>
		</header>
		<div class="ml-1 w-full grid lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
			<!-- Button: Left -->
			<button type="button" class="btn-icon variant-filled hidden lg:block" on:click={multiColumnLeft}>
				<Icon icon="icon-park:left" />
			</button>
			<!-- Carousel -->

			<div bind:this={carousselElem} class="snap-x snap-mandatory scroll-smooth mt-6 flex gap-2 pb-2 overflow-x-auto">
				{#each data.props.images as image}
			
					<a href={image.url} target="_blank" class="shrink-0 w-[80%] snap-start">
						<img
							class="rounded-container-token hover:brightness-125"
							src={image}
							alt={image.name}
							title={image.name}
							loading="lazy"
						/>
					</a>
				{/each}
			</div>
			<!-- Button-Right -->
			<button type="button" class="btn-icon hidden lg:block variant-filled" on:click={multiColumnRight}>
				<Icon icon="icon-park:left" rotate={2} />
			</button>
		</div>
		<footer class="card-footer text-center mt-4 text-sm font-light ">Laissez vos client être guider par notre IA pour choisir la saveur la plus adaptée a leurs besoin</footer>
	</div>
	<div class="p-6 flex flex-wrap">
		<h1 class="h1 text-tertiary-600 text-center capitalize "> Découvrez Vos Saveurs Idéales </h1>

		<h2 class="text-secondary-200 h3 mt-6"> Personnalisation Intelligente </h2>
		<p> 
			Notre technologie IA analyse vos goûts et préférences pour vous suggérer des saveurs parfaites pour votre palais.
		</p>

		<h2 class="text-secondary-200 h3 mt-2"> Recommandations Saisonnières </h2>
		<p>
			Profitez des saveurs qui correspondent à chaque saison. Que ce soit un e-liquide rafraîchissant pour l'été ou un sandwich réconfortant pour l'hiver.
		</p>

		<h2 class="text-secondary-200 h3 mt-2">Choix Basé sur le Moment de la Journée </h2>
		<p>
			Du petit-déjeuner au dîner, en passant par la pause-café, l'application sait ce qui vous plaira à tout moment de la journée, adaptant les suggestions en fonction de l'heure.
		</p>

		<h2 class="text-secondary-200 h3 mt-2">Expérience Utilisateur Optimisée</h2>
		<p>
			Scannez un QR code en magasin et laissez-vous guider par une interface fluide et conviviale. Trouvez rapidement ce que vous cherchez sans perdre de temps.
		</p>

		<h2 class="text-secondary-200 h3 mt-2">Un Monde de Saveurs à Portée de Main</h2>
		<p>
			Avec une large sélection de commerces partenaires, vous avez accès à une variété infinie de saveurs et de produits.
		</p>
	</div>
	<div>
		<Stepper>
			<h1 class="h1 text-tertiary-600 text-center capitalize">Comment ça marche? </h1>
			<Step>
				<svelte:fragment slot="header"><h3 class="text-center mt-1">Scanner le QRCode </h3></svelte:fragment>
				<div class="flex flex-wrap justify-center">
					<img  src="/images/howitworks/step1.png" alt="QRCode" class="w-1/2 rounded-full self-center">
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header"><h3 class="text-center mt-1">Choisir les saveurs que vous aimez</h3></svelte:fragment>
				<div class="flex flex-wrap justify-center">
					<InputChip bind:value={flavorList} name="flavor" regionInput="hidden" chips="variant-filled-secondary" whitelist={flavorsWhitelist} />
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header"><h3 class="text-center mt-1">L'IA Analyse vos gout</h3></svelte:fragment>
				<div class="flex flex-wrap justify-center">
					<ProgressRadial />
				</div>
			</Step>
			<Step>
				<svelte:fragment slot="header"><h3 class="text-center mt-1">Recevez votre conseil personnalisé</h3></svelte:fragment>
				<div class="flex flex-wrap justify-center">
					<button class='btn variant-filled' on:click={() => openModal()}> Appuyer pour voir le resultat </button>
				</div>
			</Step>
		</Stepper>
	</div>
</div>
