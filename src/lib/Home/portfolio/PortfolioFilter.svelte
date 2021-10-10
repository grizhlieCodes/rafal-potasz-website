<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import Icon from '$lib/Decorations/Icon.svelte';
	let options = [
		{
			name: 'featured',
			text: 'Featured',
			filters: ['featured']
		},
		{
			name: 'dev-only',
			text: 'Dev Only',
			filters: ['dev']
		},
		{
			name: 'dev-design',
			text: 'Dev + Design',
			filters: ['dev', 'design']
		},
		{
			name: 'all',
			text: 'All',
			filters: []
		}
	];

	export let initialFilter;
	$: selectedFilter = initialFilter;


	const dispatchFilter = (filter) => {
		dispatch('updateFilter', filter);
	};

	$: dispatchFilter(selectedFilter);

	const updateProjects = (chosenFilters) => {
		const data = chosenFilters;
		dispatch('updateProjects',data)
	};
</script>

<div class="filters-container">
	{#each options as { name, text, filters }}
		<label for={name} class:active={selectedFilter === name}>
			<input
				type="radio"
				id={name}
				{name}
				value={name}
				class="hidden"
				bind:group={selectedFilter}
				on:click={() => updateProjects(filters)} />
			<div class="label-content">
				<div class="radio-button" />
				<p class="radio-description">{text}</p>
			</div>
		</label>
	{/each}
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	input.hidden {
		display: none;
	}

	.filters-container {
		@include flex(row nowrap, start, center);
		gap: 1rem;
		margin-bottom: 6rem;
	}

	label {
		cursor: pointer;

		&.active {
			.label-content .radio-button {
				background: v(clr-portfolio-filter-accent);
				border-color: v(clr-portfolio-filter-accent);
			}

			.label-content {
				.radio-description {
					color: v(clr-portfolio-filter-accent);
				}
			}
		}
	}

	.label-content {
		@include flex(row nowrap, start, center);
		gap: 0.7rem;
		p {
			font-family: v(fira);
			font-size: fluid(desktop, 1.4, 1.55);
			color: v(clr-text-focused);
			font-weight: 700;
			transition: color 250ms;
		}

		.radio-button {
			display: grid;
			place-items: center;
			$size: 1.4rem;
			width: $size;
			height: $size;
			border: v(clr-text-focused) solid 1px;
			border-radius: 50%;
			transition: background 250ms;
		}
	}

	:global(label.active .label-content .radio-button svg path) {
		fill: v(clr-portfolio-filter-active-tick);
	}
</style>
