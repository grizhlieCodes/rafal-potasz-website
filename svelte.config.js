/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify'
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: netlify()
	},
	preprocess: preprocess()
};

export default config;
