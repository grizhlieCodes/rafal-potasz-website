<script>
	import Header from '$lib/Navigation/Header.svelte';
	import Overlay from '$lib/Decorations/Overlay.svelte'

	let showOverlay = false
	$: console.log(showOverlay)
</script>
{#if showOverlay}
	 <Overlay />
{/if}

<Header on:toggleMenu={() => showOverlay = !showOverlay} />
	
<slot />

<style lang="scss">
	:global(body) {
		width: 100%;
		height: 200vh;
		background-image: url('/images/shared/bg-dark.png');
		background-repeat: repeat;
	}
</style>
