<script>
import { onMount } from "svelte";
import { pageTitle } from "$lib/stores/themeStore";
    onMount(async () => {
		pageTitle.set('Dashboard');
	});

</script>