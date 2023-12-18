<script lang='ts'>
import { onMount } from "svelte";
import { pageTitle } from "$lib/stores/themeStore";
onMount(() => {
    pageTitle.set('Connexion');
});

    let email = '';
    let password = '';
    let repassword = '';
    let loginForm = true;
    let inputColor = {
        email: '',
        password: '',
        repassword: ''
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    function resetForm(){
        email = '';
        password = '';
        repassword = '';
        inputColor = {
            email: '',
            password: '',
            repassword: ''
        }
    }

    function checkMail(value: String){
        if(!value.match(emailRegex)){
            inputColor.email = 'input-warning';
        }
        else{
            inputColor.email = '';
        }
    }

    function checkPasswordStrong(value: string){
        if(!value.match(passwordRegex)){
            inputColor.password = 'input-error';
        }
        else{
            inputColor.password = '';
        }
    }

    function passwordEquality(password: string, repassword: string){
        if(password !== repassword){
            inputColor.repassword = 'input-error';
            inputColor.password = 'input-error';
        }
        else{
            inputColor.repassword = 'input-success';
            inputColor.password = 'input-success';
        }
    }

    function toggleForm(){
        loginForm = !loginForm;
    }
</script>
<form method="POST" class="card w-auto  p-4">
    {#if loginForm}
            <label class="label">
                <h1>Connexion</h1>
                <span>Adresse Mail:</span>
                <input id="mailLog" name="email" class="input {inputColor.email}" bind:value={email} on:input={() => checkMail(email)} title="Input (mail)" type="email" placeholder="jhondoe@example.com" />
                <span>Mot De Passe:</span>
                <input id="passLog" name="password" class="input {inputColor.password}"  bind:value={password} on:input={() => checkPasswordStrong(password)} title="Input (password)" type="password" placeholder="Password" />
            </label>	
        {:else}
            <label class="label">
                <h1>Inscription</h1>
                <span>Adresse Mail:</span>
                <input id="mailRegister"  name="email" class="input {inputColor.email}" bind:value={email} on:input={() => checkMail(email)} title="Input (mail)" type="email" placeholder="jhondoe@example.com" />
                <span>Mot De Passe:</span>
                <input id="passRegister" name="password" class="input {inputColor.password}"  bind:value={password} on:input={() => checkPasswordStrong(password)} title="Input (password)" type="password" placeholder="Password" />
                <span>Confirmer Mot De Passe:</span>
                <input id="repassRegister"  name="repassword" class="input {inputColor.repassword}"  bind:value={repassword} on:input={() => passwordEquality(password, repassword)} title="Input (password)" type="password" placeholder="Password" />
            </label>	
    {/if}
    {#if loginForm}
        <button formaction="?/login" type="submit" class="mt-1 btn variant-filled-primary">Se Connecter </button>
    {:else} 
        <button formaction="?/register" type="submit" class="mt-1 btn variant-filled-primary"> Créer Mon compte </button>
    {/if} 

    <button type="reset" on:click={resetForm} class="mt-1 btn variant-soft-error">Annuler</button>
</form>
<div class="w-full mt-2 flex flex-wrap justify-center">
     <p class="cursor-pointer" on:click={toggleForm}>{#if loginForm} Pas encore Inscrit?<strong class="text-primary-500"> Inscription </strong>{:else} Déjà Inscrit? <strong class="text-primary-500">Connexion </strong>{/if} </p>
</div>
