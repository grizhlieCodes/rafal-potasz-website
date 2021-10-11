/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		adapter: netlify(),
		target: '#svelte',
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: 'continue'

		},
	},
	preprocess: preprocess()
};

export default config;
