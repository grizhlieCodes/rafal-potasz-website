<script>
	import { moveOnScroll } from '$lib/scripts/animations.js';
	import { setHeroImgHeight } from '$lib/scripts/helperFunctions.js';
	import {onMount} from 'svelte';

	let imageNames = [
		{ name: 'rafal', directionFrom: [] },
		{ name: 'rust', directionFrom: ['top', 'left'] },
		{ name: 'computer', directionFrom: ['bottom'] },
		{ name: 'watch', directionFrom: ['left'] },
		{ name: 'statue', directionFrom: ['top', 'right'] },
		{ name: 'eagle', directionFrom: ['bottom', 'right'] },
		{ name: 'book', directionFrom: ['bottom', 'left'] }
	];
	let container;
	onMount(() => {
		setHeroImgHeight(container)
	})

</script>

<!-- <svelte:window bind:innerWidth={width} /> -->

<svelte:window on:resize={() => setHeroImgHeight(container)} />

<div class="hero-img-container" bind:this={container}>
	<div class="backdrop" />
	<div class="images-container">
		{#each imageNames as { name }}
			<img
				class={name}
				src="/images/home/shared/hero-images/{name}.png"
				alt={name}
				use:moveOnScroll={5} />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.hero-img-container {
		width: 100%;
		max-width: fluid(desktop, 32.5, 40);
		// height: fluid(desktop, 32.5, 45);
		position: relative;
		z-index: 1;
		@include mq(tablet) {
			flex-grow: 1;
		}
	}

	.images-container {
		width: 100%;
		height: 0;
		padding-top: 111%;
		position: absolute;
	}

	.backdrop {
		top: 0;
		left: 0;
		width: 100%;
		// height: 0;
		padding-top: 100%;
		/* height: 100%; */
		/* aspect-ratio: 1; */
		background: radial-gradient(circle, v(clr-hero-lighter) 10%, v(clr-hero-darker));
		border-radius: 50%;
		position: absolute;
	}

	.images-container img {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.images-container img:not(:is(.rafal, .eagle, .book, .computer)) {
		animation: 4s infinite hoverImage ease-in-out alternate;
	}

	.images-container img.rust {
		animation-delay: 1.5s;
	}
	.images-container img.watch {
		animation-delay: 0.5s;
	}

	@keyframes hoverImage {
		from {
			top: 0;
		}
		to {
			top: -2rem;
		}
	}

	.rafal {
		z-index: 2;
	}
	.book,
	.computer,
	.eagle {
		z-index: 3;
	}
</style>
