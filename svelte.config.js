/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		adapter: netlify(),
		target: '#svelte',
	},
	preprocess: preprocess()
};

export default config;
