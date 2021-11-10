<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import { getContext } from 'svelte';
	import {flyChildren} from '$lib/scripts/animations.js'
	let size = getContext('size');
	let cardsData = [
		{
			title: 'Discovery',
			name: 'discovery',
			content: `<p class="how-it-works-par"> We will start by <span>exploring</span> your vision and mission by using a holistic approach to distil what your website is going to be about. 
                </p>
                <p class="how-it-works-par">We will ensure that it champions your essence and ultimately communicate your service to your clients.</p>`,
			alt: 'Icon of 2 people with a speech bubble above them symbolising an exchange of ideas.'
		},
		{
			title: 'Creation',
			name: 'creation',
			content: `                <p class="how-it-works-par">Once we have <i>distilled</i> the right information, I'll get to building your website.</p>  
                <p class="how-it-works-par">I'll do everything in my power make it <span>fit-for-purpose</span>  and ensure that it's a website that you and your clients will <i>love</i>.</p>
                <p class="how-it-works-par">Your <i>satisfaction</i> and the website's <i>effectiveness</i> are my main priorities.</p>`,
			alt: 'An icon of the nuclear symbol with a heart in the middle to represent creation.'
		},
		{
			title: 'Support',
			name: 'support',
			content: `<p class="how-it-works-par">I'm a firm believer in the fact that nothing is ever truly finished. For this reason I'd like to stick around and ensure that you have the <span>assistance</span> you need.</p> 
                 <p class="how-it-works-par">Whether it's about small fixes, or large additions, I think it's best to stick together if both parties are <i>happy</i>!</p>`,
			alt: 'Two hands with open palms opened with small man figure above them symbolising support.'
		}
	];
</script>

<Section sectionClass="how-it-works-section span-1220">
	<div class="flex-container" use:flyChildren={['section.how-it-works-section .flex-container > *:not(.cards-container)', 5, 0, 0]}>
		<Heading type="2" content="how it works" />
		<div class="cards-container"  use:flyChildren={['section.how-it-works-section .flex-container .cards-container > *', 5, 0, 0]}>
			{#each cardsData as { title, name, content, alt }}
				<div class="card">
					<img src="/images/home/shared/how-i-help/{name}.png" {alt} class="card-img" />
					<Heading content={title} type="4" />
					<div class="triangle" />
					<div class="description-container">
						{@html content}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<style lang="scss">
	@import '../../scss-styles/mixins';

	.flex-container {
		@include flex(column nowrap, start, center);
		gap: 4rem;
	}

	.cards-container {
		@include flex(row wrap, start, stretch);
		width: 100%;
		height: auto;
		gap: 4rem;

        @include mq(tablet) {
            gap: 6rem;
        }
        @include mq(desktop) {
            gap: 8rem;
        }

		.card {
			position: relative;
			flex: 1;
			min-width: 27.5rem;
			// max-width: 27.5rem;
			@include flex(column nowrap, start, center);
			gap: 1rem;
			background: v(clr-works-card-bg);
			padding: 0 3rem 3rem;
			margin-top: calc(9.7rem * 0.5);
			padding-top: calc((9.7rem * 0.5) + 1rem);

			img {
				transform: translate(-50%, -50%);
				position: absolute;
				top: 0;
				left: 50%;
			}

			.triangle {
				height: 0;
				width: 0;
				border-left: 5px solid v(clr-works-card-bg);
				border-right: 5px solid v(clr-works-card-bg);
				border-top: 10px solid v(clr-works-card-red-accent);
			}
		}
	}

	:global(.how-it-works-par) {
		font-family: v(fira);
		font-size: fluid(desktop, 1.45, 1.65);
		color: v(clr-text-focused);
		line-height: fluid(desktop, 1.6, 1.9);
	}
	:global(.how-it-works-par:not(:nth-last-child(1))) {
		margin-bottom: 1.2rem;
	}
	:global(.how-it-works-par span) {
		font-style: italic;
		color: v(clr-text-accent-cyan);
	}
</style>
