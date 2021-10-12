<script>
	import { writable } from 'svelte/store';
	import { setContext, onMount } from 'svelte';
	import Header from '$lib/Navigation/Header.svelte';
	import Overlay from '$lib/Decorations/Overlay.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import { calcRealSize } from '$lib/scripts/helperFunctions.js';
	import darkMode from '$lib/stores/darkmode.js'

	let windowWidth,
		scrollbarWidth,
		realWidth = writable(''),
		mounted = false,
		showOverlay = false,
		showMobileNav = false;

	$: realWidth.set(calcRealSize(windowWidth, scrollbarWidth));
	setContext('size', realWidth);

	onMount(() => {
		mounted = true;
		if (mounted) {
			scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		}
	});

	const toggleMenu = () => {
		showOverlay = !showOverlay
		showMobileNav = !showMobileNav
	};

	const closeActiveModal = () => {
		if(showMobileNav){
			showOverlay = !showOverlay
			showMobileNav = !showMobileNav
		}
	}
</script>

<svelte:window bind:innerWidth={windowWidth} on:load={() => darkMode.checkDarkmode()}/>

{#if showOverlay}
	<Overlay on:closeModal={closeActiveModal} />
{/if}

<Header on:toggleMenu={toggleMenu} {showMobileNav} />
<slot />
<Footer />

<style lang="scss">
	@import '../scss-styles/mixins';

	:global(html){
		scroll-behavior: smooth;
	}

	:global(body) {
		width: 100%;
		background-color: v(clr-body-bg);
		background-repeat: repeat;
	}

	:global(body.light){
		background-image: url('/images/shared/bg-light2.png');
	}

	:global(body.dark) {
		background-image: url('/images/shared/bg-dark.png');
	}

	:global(div#svelte) {
		min-height: 100vh;
		overflow: hidden;
		display: grid;
		grid-auto-rows: min-content;
		grid-template-columns: minmax(2.4rem, 4rem) minmax(32.7rem, 1fr) minmax(2.4rem, 4rem);
		grid-template-areas:
			'. header .'
			'main main main'
			'footer footer footer';

		@include mq(tablet) {
			grid-template-columns: minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);
			grid-template-areas:
				'. header header header .'
				'main main main main main'
				'footer footer footer footer footer';
		}

		@include mq(desktop) {
			grid-template-columns: 1fr minmax(0rem, 10.5rem) 90rem minmax(0rem, 10.5rem) 1fr;
			grid-template-areas:
				'. header header header .'
				'main main main main main'
				'footer footer footer footer footer';
		}
	}
</style>
