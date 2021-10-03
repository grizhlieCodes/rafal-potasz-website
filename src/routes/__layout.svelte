<script>
	import { writable } from 'svelte/store';
	import { setContext, onMount } from 'svelte';
	import Header from '$lib/Navigation/Header.svelte';
	import Overlay from '$lib/Decorations/Overlay.svelte';
	import { calcRealSize } from '$lib/scripts/helperFunctions.js';

	let windowWidth,
		scrollbarWidth,
		realWidth = writable(''),
		mounted = false,
		showOverlay = false;
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
	@import '../scss-styles/mixins';
	:global(body) {
		width: 100%;
		height: 200vh;
		background-image: url('/images/shared/bg-light.png');
		background-repeat: repeat;
	}

	:global(body.dark) {
		background-image: url('/images/shared/bg-dark.png');
	}

	:global(div#svelte) {
		display: grid;
		grid-template-columns: minmax(2.4rem, 4rem) 1fr minmax(2.4rem, 4rem);
		grid-template-areas:
			'. header .'
			'. main .'
			'footer footer footer';

		@include mq(tablet) {
			grid-template-columns: minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);
			grid-template-areas:
				'. header header header .'
				'. . main . .'
				'footer footer footer footer footer';
		}

		@include mq(desktop) {
			grid-template-columns: 1fr minmax(0rem, 10.5rem) 90rem minmax(0rem, 10.5rem) 1fr;
			grid-template-areas:
				'. header header header .'
				'. . main . .'
				'footer footer footer footer footer';
		}
	}
</style>
