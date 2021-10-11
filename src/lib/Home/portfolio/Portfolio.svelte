<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import PortfolioFilter from './PortfolioFilter.svelte';
	import PortfolioText from './PortfolioText.svelte';
	import PortfolioVideo from './PortfolioVideo.svelte';
	import PortfolioData from '$lib/stores/portfolio.js';

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let filter = 'featured';
	const updateFilter = (e) => {
		filter = e.detail;
	};

	let localPortfolio = [...$PortfolioData].filter(p => p.type.includes('featured'));

const dispatchRecalcLines = () => {
	dispatch('recalculateLines')
}

	const updateProjects = (e) => {
		let data = e.detail;
		const noFilter = data.length === 0;
		const oneFilter = data.length === 1;
		const multipleFilters = data.length >= 2;

		if (noFilter) {
			localPortfolio = [...$PortfolioData];
			dispatchRecalcLines()
			return;
		}
		if (oneFilter) {
			localPortfolio = $PortfolioData.filter((p) => {
				return p.type.includes(data[0]) && !p.type.includes('design');
			});
			dispatchRecalcLines()
			return;
		}
		if (multipleFilters) {
			let returnedData = $PortfolioData.filter((project) => {
				const projectTags = project.type;
				return data.every((filter) => projectTags.includes(filter));
			});
			localPortfolio = returnedData;
			dispatchRecalcLines()
			return;
		}
	};
</script>

<Section sectionClass="portfolio span-1220" marginBottom="15">
	<div class="flex-container">
		<Heading type="2" content="portfolio" />
		<PortfolioFilter
			on:updateFilter={updateFilter}
			initialFilter={filter}
			on:updateProjects={updateProjects} />
		<div class="projects">
			{#each localPortfolio as project, i (project.name)}
				<div
					class="project-container"
					in:receive={{ key: project.name }}
					out:send={{ key: project.name }}
					animate:flip={{ duration: 200 }}>
					<PortfolioText {project} />
					<PortfolioVideo {project} />
				</div>
			{/each}
		</div>
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';
	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 3rem;
		transition: padding 250ms;
		@include mq(desktop) {
			align-items: center;
			padding: 0 4rem;
		}
		@include mq(desktop-wide){
			padding: 0;
		}
	}

	.projects {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 8rem;
		@include mq(desktop) {
			gap: 10rem;
		}
	}

	.project-container {
		@include flex(column nowrap, start, start);
		width: 100%;
		gap: 2.7rem;
		position: relative;

		@include mq(desktop) {
			@include eflex(row nowrap, space-between, center);
		}

		&:nth-of-type(odd){
			&::after {
				left: 0;
			}
		}
		&:nth-of-type(even){
			&::after {
				right: 0;
			}
		}

		&::after {
			content: '';
			position: absolute;
			width: 70vw;
			height: 1px;
			background: v(clr-line-bg);
			bottom: -4rem;
		}

		@include mq(desktop){
			&::after {
				bottom: -5rem;
			}
		}
	}




</style>
