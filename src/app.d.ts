// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals extends DefaultLocal{ 
		user?: {    
			isAuthenticated: boolean;
			token: string;
			refresh_token: string;
			email: string;
		} 
		menuItems: { 
			tabName: string; 
			tabPath: string; 
			tabSet: number; 
			tabOpen: boolean; 
			tabIcon: string; 
		}[]
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}


