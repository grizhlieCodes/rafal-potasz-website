<script>
	import { onMount } from 'svelte';
	import Line from './Line.svelte';
	let mounted = false,
		headerDimensions = {width: 0, marginBottom: 0},
		heroDimensions = {width: 0, marginBottom: 0},
		philosophyDimensions = {width: 0, marginBottom: 0},
		technologiesDimensions = {width: 0, marginBottom: 0},
		portfolioDimensions = {width: 0, marginBottom: 0},
		formDimensions = {width: 0, marginBottom: 0},
		philDimensions = {width: 0, marginBottom: 0},
		sectionGap = 0,
		// allComplete = false,
		loaded;

	const updateDimensions = () => {
		headerDimensions = returnElDimensions('header')
		heroDimensions = returnElDimensions('section.hero')
		philosophyDimensions = returnElDimensions('section.philosophy')
		technologiesDimensions = returnElDimensions('section.technologies')
		portfolioDimensions = returnElDimensions('section.portfolio')
		formDimensions = returnElDimensions('section.contact-form')
	};

	const returnElDimensions = (selector) => {
		const el = document.querySelector(`${selector}`);
		const elHeight = el.clientHeight;
		const elMarginBottom = parseInt(window.getComputedStyle(el).getPropertyValue('margin-bottom'));
		const main = document.querySelector('main');
		const mainGridGap = parseInt(window.getComputedStyle(main).getPropertyValue('row-gap'));
		sectionGap = mainGridGap;
		return {height: elHeight, marginBottom: elMarginBottom + mainGridGap};
	};
	$: if (loaded) updateDimensions();

	export function rerunLines() {
		setTimeout(() => {
			updateDimensions();
		}, 150);
	}
	let scrolled = false;
	const calcLinesOnScroll = (e) => {
		if (!scrolled) {
			updateDimensions();
		}
		return;
	};
</script>

<svelte:window
	on:resize={updateDimensions}
	on:scroll={calcLinesOnScroll}
	on:load={() => (loaded = true)} />

<div class="lines-container">
	<div class="section first-section" style="height: {headerDimensions.height}px;">
		<Line direction="horizontal" dimension="100vw" top="20%" />
		<Line direction="vertical" dimension="100vh" left="5%" />
		<span class="circle" />
	</div>
	<div
		class="section second-section"
		style="height: {heroDimensions.height}px; margin-bottom: {heroDimensions.marginBottom}px;" />
	<div
		class="section third-section"
		style="height: {philosophyDimensions.height}px; margin-bottom: {philosophyDimensions.marginBottom}px;">
		<Line direction="horizontal" dimension="70vw" left="0%" bottom="-20%" />
	</div>
	<div
		class="section fourth-section"
		style="height: {technologiesDimensions.height}px; margin-bottom: {technologiesDimensions.marginBottom}px;">
		<Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%" />
	</div>
	<div
		class="section fifth-section"
		style="height: {portfolioDimensions.height}px; margin-bottom: {portfolioDimensions.marginBottom}px;">
		<!-- <Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%"/> -->
		<span class="circle" />
	</div>
	<div class="section sixth-section" style="height: {formDimensions.marginBottom}px; margin-bottom: {formDimensions.height}px;">
		<!-- <Line direction="horizontal" dimension="70vw" right="0%" bottom="-20%"/> -->
		<!-- <span class="circle" /> -->
		<span class="square" style="height: {formDimensions.height}px; width: {formDimensions.height}px;" />
	</div>
</div>

<style lang="scss">
	@import '../../scss-styles/mixins';

	div {
		transition: height 250ms;
	}

	span {
		display: block;
		position: absolute;
		aspect-ratio: 1;
		border: 1px solid v(clr-line-bg);
		background: transparent;
	}
	span.circle {
		width: 90%;
		max-width: 100rem;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}

	span.square {
		left: 50%;
		transform: translate(-50%, 7%) rotate(45deg);
	}

	.fifth-section {
		span.circle {
			max-width: 60%;
			transform: translate(50%, 0%);
			right: 0;
			top: 0;
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
