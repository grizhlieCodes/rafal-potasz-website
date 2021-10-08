<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import PortfolioFilter from './PortfolioFilter.svelte';
	import PortfolioText from './PortfolioText.svelte';
	import PortfolioVideo from './PortfolioVideo.svelte';
	import PortfolioData from '$lib/stores/portfolio.js';

	let filter = 'featured';
	const updateFilter = (e) => {
		filter = e.detail;
		updateLocalPortfolio(e.detail)
	};

	const updateLocalPortfolio = (updatedFilter) => {
		localPortfolio = localPortfolio.filter()
	}

	let localPortfolio = [...$PortfolioData];
	
	
</script>

<Section sectionClass="span-1220">
	<div class="flex-container">
		<Heading type="2" content="portfolio" />
		<PortfolioFilter on:updateFilter={updateFilter} initialFilter={filter} />
		{#each localPortfolio as project, i (project)}
			<PortfolioText {project}/>
			<PortfolioVideo />
		{/each}
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 3rem;

		@include mq(desktop) {
			align-items: center;
		}
	}
</style>
