<script>
	import { writable } from 'svelte/store';
	import { setContext, onMount } from 'svelte';
	import Header from '$lib/Navigation/Header.svelte';
	import Overlay from '$lib/Decorations/Overlay.svelte';
	import {calcRealSize} from '$lib/scripts/helperFunctions.js';

	let windowWidth, scrollbarWidth, realWidth = writable(''), mounted = false, showOverlay = false;
	$: realWidth.set(calcRealSize(windowWidth, scrollbarWidth));
	setContext('size', realWidth);

	onMount(() => {
		mounted = true;
		if (mounted) {
			scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		}
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if showOverlay}
	<Overlay />
{/if}

<Header on:toggleMenu={() => (showOverlay = !showOverlay)} />

<slot />

<style lang="scss">
	:global(body) {
		width: 100%;
		height: 200vh;
		background-image: url('/images/shared/bg-dark.png');
		background-repeat: repeat;
	}
</style>
