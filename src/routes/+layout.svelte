<script lang="ts">
export let data;

	import { 
		initializeStores, 
		AppShell, 
		AppBar, 
		AppRail, 
		AppRailAnchor, 
		getDrawerStore, 
		Drawer, 
		LightSwitch, 
		autoModeWatcher,
		Toast,
		Modal,
		TabGroup,
		Tab,
		TabAnchor
	} from '@skeletonlabs/skeleton';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onMount} from 'svelte';

    import { isMenuShow, themeStorage, showMenu, hideMenu, pageTitle } from '$lib/stores/themeStore';

	import '../app.postcss';
	import Icon from '@iconify/svelte';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import type { AfterNavigate } from '@sveltejs/kit';

	//initialisation du store Skeleton
	initializeStores();

	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		//bgDrawer: 'bg-purple-900 text-white',
		//bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
		position: 'right',
		duration: 700,
	};

	const themes = ['skeleton', 'wintry', 'modern', 'hamlindigo', 'rocket', 'sahara', 'gold-nouveau', 'vintage', 'seafoam', 'crimson'];

	onMount(() => {
        const unsubscribe = themeStorage.subscribe(value => {
			document.body.setAttribute('data-theme', value);
        });
        return unsubscribe; 
    });
	
	function setTheme(value:string) {
		themeStorage.set(value);
		document.body.setAttribute('data-theme', value);

	}

	let tabsBottomNav = 0;

	function switchMenu() {
		const currentMenuState = get(isMenuShow);
		if (currentMenuState === 'true') {
			
			hideMenu();
		} else {
			showMenu();
		}
	}

	afterNavigate((params: AfterNavigate) => {
		const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	function togglePaleteDesign() {
		drawerStore.open(drawerSettings);
	}

	let session = data.props.session ?? null;
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
<Toast />

<Drawer>
	<h2 class="h3 flex my-2">
		<span class="ml-2 flex-grow bg-gradient-to-br from-primary-400 via-secondary-200 to-secondary-700 bg-clip-text text-transparent box-decoration-clone">
			Palette Design
		</span>
		<div class="flex-none mr-2 self-center">
			<LightSwitch />
		</div>
	</h2>
	<hr class="!border-t-1" />
	<h2 class="h3 flex p-4 my-2">
		Choisissez un theme couleur 
	</h2>
	<div class="flex flex-nowrap overflow-auto gap-4 my-2 ml-1">
		{#each themes as theme}
			<div class="card bg-surface-500 card-hover p-4">
				<span class="text-sm text-gray-500 dark:text-gray-400"></span>
				<button class="btn btn-sm" on:click={() => setTheme(theme)}>{theme}</button>
			</div>
		{/each}
	</div>
</Drawer>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead"><button  on:click={switchMenu}><Icon icon="line-md:menu" width="36" /></button></svelte:fragment>
			<h1 class="h2 font-bold bg-gradient-to-br from-secondary-500 to-tertiary-500 bg-clip-text text-transparent box-decoration-clone">PayeTonMenu</h1>
			<svelte:fragment slot="trail"><button on:click={togglePaleteDesign} class="btn"><Icon icon="mdi:paint-outline" width="36" /></button></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<svelte:fragment slot="sidebarLeft">
		<div class:hidden={$isMenuShow === 'false'}>
			<AppRail>
				<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Accueil</AppRailAnchor>
				{#if session.auth}
					<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>Dashboard</AppRailAnchor>
					<AppRailAnchor href="/auth/logout" selected={$page.url.pathname === '/auth/logout'}>Déconnexion</AppRailAnchor>
				{:else}
					<AppRailAnchor href="/auth" selected={$page.url.pathname === '/auth'}>Connexion</AppRailAnchor>
				{/if}
			</AppRail>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<h1 class="h1 flex flex-wrap justify-center my-4">
			<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
				{$pageTitle}
			</span>
		</h1>
		<div class="xl:px-32 px-24">
			<hr class="!border-t-2 " />
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between mb-20">
				<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://app.nhbuilder.xyz/" class="hover:underline">PayeTonMenu</a>. All Rights Reserved.
			</span>
			<ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<a href="#" class="hover:underline me-4 md:me-6">About</a>
				</li>
				<li>
					<a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
				</li>
				<li>
					<a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
				</li>
				<li>
					<a href="#" class="hover:underline">Contact</a>
				</li>
			</ul>
		</div>
	</svelte:fragment>
	<!-- (footer) -->
	<TabGroup 
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full absolute bottom-0"
	>

	{#if data.props.menuItems != undefined}
		{#each data.props.menuItems as item}
			<TabAnchor href={item.tabPath} selected={$page.url.pathname === item.tabPath} class="flex flex-col items-center">
				<svelte:fragment slot="lead" ><Icon icon={item.tabIcon} width="2.8rem" height="2.8rem" /></svelte:fragment>
				<span class="hidden">{item.tabName}</span>
			</TabAnchor>
		{/each}
		{:else}
		<TabAnchor href="/">
			<svelte:fragment slot="lead"></svelte:fragment>
			<span>Erreur menu cliquer ici</span>
		</TabAnchor>
	{/if}
	</TabGroup>
</AppShell>


