<script>
	import { capitaliseFirstLetter, displayDate } from '$lib/scripts/helperFunctions';
	import Icon from '$lib/Decorations/Icon.svelte';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	export let project;
	let size = getContext('size');

	$: name = project.name;
	$: subtitle = project.subtitle;
	$: description = project.description;
	$: date = displayDate(project.dateStamp)
	$: github = project.github
	$: website = project.website
</script>

<div class="text-container" data-direction="left">
	<h3 class="project-name">{capitaliseFirstLetter(name)}</h3>
	<p class="date">{date}</p>
	<p class="subtitle">{subtitle}</p>
	{#if $size !== 'mobile'}
		<div class="description-container">
			{#each description as par}
				<p class="description" transition:slide>{par}</p>
			{/each}
		</div>
	{/if}
	<div class="links-container">
		<a href="{github}" class="link"  target="_blank">
			<Icon name="github" width="32" svgCol="clr-icon-bg-primary" svgPathCol="clr-icon-bg-primary"/>
			<p>Github</p>
		</a>
		<a href="{website}" class="link" target="_blank"> 
			<Icon name="link" width="32" svgCol="clr-icon-bg-secondary"/>
			<p>Visit Website</p>
		</a>
	</div>
	<!-- <a href="/portfolio/{name}" class="view-project-button">
		<p>VIEW PROJECT</p>
		<Icon name="arrow-right" width="1.4rem" />
	</a> -->
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	// :global(.view-project-button svg path) {
	// 	fill: v(clr-text-accent-cyan);
	// }

	// :global(.view-project-button svg) {
	// 	transform: translateY(-0.1rem);
	// }

	.text-container {
		@include flex(column nowrap, start, start);
		gap: 1.4rem;
		font-family: v(fira);

		@include mq(desktop) {
			flex: 0 0 34rem;
		}

		h3.project-name {
			color: v(clr-text-focused);
			font-size: fluid(desktop, 2.2, 3);
		}
		p.date {
			font-family: v(mono);
			color: v(clr-text-faded);
			font-size: fluid(desktop, 1.2, 1.4);
		}
		p.subtitle {
			font-family: v(roboto);
			color: v(clr-text-faded);
			font-size: fluid(desktop, 1.4, 1.6);
		}
		p.description {
			font-family: v(roboto);
			color: v(clr-text-focused);
			font-size: fluid(desktop, 1.4, 1.6);
			line-height: fluid(desktop, 1.5, 1.7);
			margin-bottom: 1.5rem;
		}

		// a.view-project-button {
		// 	@include flex(row nowrap, start, center);
		// 	gap: 0.95rem;
		// 	color: v(clr-text-accent-cyan);
		// 	transition: transform 250ms;
		// 	// animation: heartbeat 1600ms linear infinite;

		// 	&:hover {
		// 		transform: scale(1.1, 1.1) translate(0.6rem, 0);
		// 	}

		// 	@keyframes heartbeat {
		// 		0% {
		// 			transform: scale(1, 1) translate(0, 0);
		// 		}
		// 		20% {
		// 			transform: scale(1.1, 1.1) translate(0.6rem, 0);
		// 		}
		// 		40% {
		// 			transform: scale(1, 1);
		// 		}
		// 		60% {
		// 			transform: scale(1.1, 1.1) translate(0.6rem, 0);
		// 		}
		// 		100% {
		// 			transform: scale(1, 1);
		// 		}
		// 	}

		// 	p {
		// 		font-size: fluid(desktop, 1.4, 1.6);
		// 	}
		// }

		// :global(a.view-project-button:hover svg) {
		// 	transform: scale(1.1, 1.1) translate(0.5rem, -0.1rem) rotate(180deg);
		// }

		.links-container {
			@include flex(row nowrap, start, center);
			gap: 3rem;

			a {
				@include flex(row nowrap, start, center);
				gap: 1.2rem;
				transition: transform 250ms;

				&:hover {
					transform: scale(1.2);
				}

				p {
					font-family: v(roboto);
					font-size: fluid(desktop, 1.4, 1.6);
					color: v(clr-text-last);
				}
			}
		}
	}
</style>
