<script>
	import { onMount } from 'svelte';
	import Line from './Line.svelte';
	let mounted = false,
		headerHeight = 0,
		heroHeight = 0,
		philosophyHeight = 0,
		technologiesHeight = 0,
		portfolioHeight = 0,
		formHeight = 0,
		sectionGap = 0,
		philHeight,
		// allComplete = false,
		loaded;

	// onMount(() => {
	// 	setTimeout(() => {
	// 		mounted = true;
	// 		// window.addEventListener('load', () => {
	// 		// 	console.log('loaded')
	// 		// });
	// 		console.log(mounted, loaded)
	// 	}, 1000)
	// });


	const updateHeights = () => {
		headerHeight = returnElHeight('header');
		heroHeight = returnElHeight('section.hero');
		philosophyHeight = returnElHeight('section.philosophy')
		technologiesHeight = returnElHeight('section.technologies')
		portfolioHeight = returnElHeight('section.portfolio') 
		formHeight = returnElHeight('section.contact-form')
	};

	const returnElHeight = (selector) => {
		const el = document.querySelector(`${selector}`);
		const elHeight = el.clientHeight;
		const main = document.querySelector('main')
		const mainGridGap = `${window.getComputedStyle(main).getPropertyValue('row-gap')}`
		sectionGap = mainGridGap
		return elHeight;
	};
	$: if (loaded) updateHeights();

	export function rerunLines()  {
		setTimeout(() => {
			updateHeights()
		}, 150)
	}
	let scrolled = false
	const calcLinesOnScroll = (e) => {
		if(!scrolled){
			updateHeights()
		}
		return
	};

</script>

<svelte:window on:resize={updateHeights} on:scroll={calcLinesOnScroll} on:load={() => loaded = true}/>

<div class="lines-container">
	<div class="section first-section" style="height: {headerHeight}px;">
		<Line direction="horizontal" dimension="100vw" top="20%" />
		<Line direction="vertical" dimension="100vh" left="5%" />
		<span class="circle" />
	</div>
	<div class="section second-section" style="height: {heroHeight}px; margin-bottom: {sectionGap};">
	</div>
	<div class="section third-section" style="height: {philosophyHeight}px; margin-bottom: {sectionGap};">
		<Line direction="horizontal" dimension="70vw" left="0%" bottom="-20%"/>
	</div>
	<div class="section fourth-section" style="height: {technologiesHeight}px; margin-bottom: {sectionGap};">
		<Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%"/>
	</div>
	<div class="section fifth-section" style="height: {portfolioHeight}px; margin-bottom: {sectionGap};">
		<!-- <Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%"/> -->
		<span class="circle" />
	</div>
	<div class="section sixth-section" style="height: {formHeight}px; margin-bottom: {sectionGap};">
		<!-- <Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%"/> -->
		<!-- <span class="circle" /> -->
	</div>
</div>

<style lang="scss">
	@import '../../scss-styles/mixins';

	div {
		transition: height 250ms;
	}

	span.circle {
		display: block;
		position: absolute;
		width: 90%;
		max-width: 100rem;
		aspect-ratio: 1;
		background: transparent;
		border-radius: 50%;
		border: 1px solid v(clr-line-bg);
		transform: translate(-50%, -50%);
	}

	.fifth-section {
		span.circle {
			max-width: unset;
			transform: translate(50%, 0%);

		}
	}

	.lines-container {
		z-index: v(z-index-bg);
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		width: 100%;
		height: 100%;
		position: relative;

		.section {
			width: 100%;
			position: relative;
		}
	}
</style>
