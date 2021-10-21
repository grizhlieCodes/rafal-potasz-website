<script>
	import { headData } from './headData.js';
	export let key;
	let data = headData(key);
    console.log(data)
</script>

<svelte:head>
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:image" content={data.image} />
	<meta property="og:url" content={data.url} />
</svelte:head>
