<script lang="ts">
import { pageTitle } from "$lib/stores/themeStore";
import { onMount } from 'svelte';


export let data;

onMount(async () => {
	pageTitle.set('Articles');
});


interface ItemType {
    id: string,
    name: string,
    desciption: string,
    quantity: number
}
interface MultiItemsType {
    [key: string]: [key: ItemType | any]
}
let items: MultiItemsType = {};
items = data.props.items;
let totalItems = Object.keys(items).length;
console.log(items);
</script>
    <div class="table-interactive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th class="hidden md:flex">Description</th>
                    <th>Quantitée</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(items) as [i, item]}
                    <tr>
                        <td>{item.name}</td>
                        <td class="hidden md:flex">{item.description}</td>
                        <td>{item.quantity}</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="1">Articles Total: </th>
                    <td>{totalItems}</td>
                </tr>
            </tfoot>
        </table>
    </div>