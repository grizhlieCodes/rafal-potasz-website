<script>
	import { moveOnScroll } from '$lib/scripts/animations.js';
	import { setHeroImgHeight } from '$lib/scripts/helperFunctions.js';
	import {onMount} from 'svelte';

	let imageNames = [
		{ name: 'rafal'},
		{ name: 'rust'},
		{ name: 'computer'},
		{ name: 'watch'},
		{ name: 'statue'},
		{ name: 'eagle'},
		{ name: 'book'}
	];
	let container;
	let timeoutCounter = 0

	const countedTimeout = () => {
		setHeroImgHeight(container)
		timeoutCounter++
		setTimeout(() => {
			if(timeoutCounter !== 5){
				setHeroImgHeight(container)
			}
		},600)
	}

	onMount(() => {
		countedTimeout()
	})

</script>

<svelte:window on:resize={() => setHeroImgHeight(container)} />

<div class="hero-img-container" bind:this={container}>
	<div class="backdrop" />
	<div class="images-container">
		{#each imageNames as { name }}
		<div class="{name} individual-img-container" use:moveOnScroll={5}>
			<img
				class={name}
				src="/images/home/shared/hero-images/{name}.png"
				alt={name}
				 />
		</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.hero-img-container {
		width: 100%;
		max-width: fluid(desktop, 32.5, 40);
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
		background: radial-gradient(circle, v(clr-hero-bg-img-lighter) 10%, v(clr-hero-bg-img-darker));
		transition: background 400ms;
		border-radius: 50%;
		position: absolute;
	}

	.images-container .individual-img-container {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;

		img {
			width: 100%;
		}
	}

	.images-container  .individual-img-container img:not(:is(.rafal, .eagle, .book, .computer)) {
		animation: 4s infinite hoverImage ease-in-out alternate;
	}

	.images-container .individual-img-container img.rust {
		animation-delay: 1.5s;
	}
	.images-container  .individual-img-container img.watch {
		animation-delay: 0.5s;
	}

	@keyframes hoverImage {
		// from {
		// 	transform: translate(0, 0);
		// }
		to {
			transform: translateY(-2rem);
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
