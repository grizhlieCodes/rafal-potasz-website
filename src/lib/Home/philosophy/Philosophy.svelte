<script>
	import Section from '$lib/Core/Section.svelte';
	import Button from '$lib/Button.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import Icon from '$lib/Decorations/Icon.svelte';
	import {flyChildren} from '$lib/scripts/animations.js'
	import { getContext } from 'svelte';

	let size = getContext('size');
	let btnData = {
		type: 'anchor',
		link: '/about',
		btnClass: 'primary',
		content: 'ABOUT ME 🗿'
	};
	let tags = [
		'kaizen ',
		'systemic ',
		'scalable ',
		'minimal ',
		'resourceful ',
		'effective ',
		'intuitive '
	];
	
	let mainText = [
		// {
		// 	content: 'I approach my work in an identical way to approaching my life.',
		// 	textClass: 'bold'
		// },
		{
			content: 'You will find me to be a helpful colleague and an attentive listener.',
			textClass: 'normal'
		},
		{
			content:
				'You will find that I always seek to improve by remaining a student of what I do.',
			textClass: 'normal'
		},

		{
			content: 'You will notice that I like to create systems and always try improving my understanding and implementation of scalability.',
			textClass: 'normal'
		},
		{
			content: 'You will work with someone who seeks the best result, effectiveness and pragmaticism over mere eye candy.',
			textClass: 'normal'
		},
		{
			content: 'You will find me resourceful, curious and honest.',
			textClass: 'normal'
		},
		{
			content: "You will find that I think backwards, starting with the end in mind and reverse-engineering a solution.",
			textClass: 'normal'
		}
	];
	// let mainText = [
	// 	{
	// 		content: 'I approach my work in an identical way to approaching my life.',
	// 		textClass: 'bold'
	// 	},
	// 	{
	// 		content: 'I help others where I can, either by listening to or advising & teaching them.',
	// 		textClass: 'normal'
	// 	},
	// 	{
	// 		content:
	// 			'I give it my all and always seek to improve by perpetually remaining a student of what I do.',
	// 		textClass: 'normal'
	// 	},

	// 	{
	// 		content: 'I always seek to do everything systemically and scalably.',
	// 		textClass: 'normal'
	// 	},
	// 	{
	// 		content: 'I seek to simplify and aim for effectiveness of the result over mere eye-candy.',
	// 		textClass: 'normal'
	// 	},
	// 	{
	// 		content: 'I always remain resourceful and always find my way in a new challenge.',
	// 		textClass: 'normal'
	// 	},
	// 	{
	// 		content: "I never do anything that doesn't match my long-term vision.",
	// 		textClass: 'normal'
	// 	}
	// ];
</script>

<Section sectionClass="philosophy span-1220">
	<div class="flex-container" use:flyChildren={['section.philosophy .flex-container > *:not(img)', 5, 0, 0.1]}>
		<Heading content="my philosophy" type="2" />
		<p class="tags"  data-direction="right">
			{#each tags as tag}
				<span>#{tag}</span>
			{/each}
		</p>
		<p class="main-text" data-direction="left">
			{#each mainText as { content, textClass }}
				<span class={textClass}>{content}</span>
			{/each}
		</p>
		<Button {...btnData} />
		<img
			class="philosophy__nietzsche-img"
			src="/images/home/{$size}/nietzsche.png"
			alt="Portrait of Frederich Nietzsche with his usual contemplating look." loading="lazy" data-direction="right"/>
		<div class="bg-triangle normal"  data-direction="left">
			<Icon name="triangle" width="50rem" />
		</div>
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	:global(body.light) {
		img.philosophy__nietzsche-img {
			border-radius: 50%;
			mix-blend-mode: unset;
		}
	}

	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 1.7rem;
		font-family: v(fira);
		text-align: left;
		position: relative;

		.bg-triangle {
			position: absolute;
			z-index: v(z-index-behind-bg);

			&.normal {
				left: 50%;
				transform: translate(-50%, 0%);
				top: -5rem;
			}

			&.right {
				top: -5rem;
				right: 0;
				transform: rotate(180deg) translate(70%, 15%);
			}
		}

		:global(.bg-triangle svg path) {
			stroke: v(clr-line-bg);
		}

		@include mq(desktop) {
			align-items: center;
			text-align: center;
		}

		img {
			position: absolute;
			right: 0;
			bottom: 0;
			transform: translate(65%, 0%);
			z-index: v(z-index-bg);
			mix-blend-mode: lighten;
			width: 25rem;
			transition: border-radius 400ms, transform 250ms, left 250ms, right 250ms;

			@include mq(tablet-small) {
				bottom: unset;
				top: 50%;
				transform: translate(50%, -50%);
				width: 27.5rem;
			}
			@include mq(tablet) {
				bottom: unset;
				transform: translate(20%, -50%);
			}

			@include mq(tablet-wide) {
				width: 30rem;
				transform: translate(41%, -50%);
			}
		}

		p.tags {
			color: v(clr-text-last);
			font-weight: 700;
			font-size: fluid(desktop, 1.3, 1.5);
			max-width: 26.5rem;
			line-height: 1.8rem;
			margin-bottom: 1rem;
		}

		p.main-text {
			max-width: 22.7rem;
			color: v(clr-text-focused);
			font-size: fluid(desktop, 1.4, 1.65);
			line-height: 2rem;
			margin-bottom: 2rem;

			@include mq(mobile-wide) {
				max-width: 33.5rem;
			}
			@include mq(phablet) {
				max-width: 43rem;
			}
			
			@include mq(tablet-small){
				max-width: 48.7rem;

			}

			span {
				display: block;
				&.bold {
					font-weight: 700;
					text-transform: uppercase;
				}

				&:not(:nth-last-child(1)) {
					margin-bottom: 1rem;
				}
			}
		}
	}
</style>
