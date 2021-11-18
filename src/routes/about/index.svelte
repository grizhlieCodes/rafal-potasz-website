<script context="module">
	export const prerender = true;
</script>

<script>
	import Main from '$lib/Core/Main.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import Section from '$lib/Core/Section.svelte';
	import hiringChoice from '$lib/stores/hiringChoice.js';
	const otherInfo = [
		"I'm 29, I was born in Poland and then moved to England 19 years ago.",
		'I currently work as a finance analyst and spend most of my free time learning web development and design.',
		"I am a 'self diagnosed' INTJ.",
		"I love learning via solving problems. It's both daunting and exciting.",
		'I seek to simplify and aim for effectiveness over mere eye-candy.',
		'I start with the end in mind and work my way backwards.',
		"I'm a nerd who had social anxiety and grew out of it by putting myself through a sales job and giving a best man's speech at a best friend's wedding (I had a panic attack the week before it and still ended up doing it).",
		"I'm a naturally blunt person who has worked a long time to become a better listener and communicator.",
		'I love dark humour as well as dark/noir series. I prefer dressing in dark clothing too come to think of it.',
		"I have a fiancé who is a spitting opposite image of me, she's happy, bubbly and bursting with energy. Our main commonality is laughter and love of ideas."
	];
</script>

<Main mainClass="about" extraStyling="row-gap: 0; ">
	<Section sectionClass="about__heading span-900">
		<Heading type="1" content="A little bit about me" />
	</Section>
	<Section
		sectionClass="about__start span-900 top-borders"
		extraStyling="padding-top: 7.5rem; padding-bottom: 7.5rem">
		<div class="flex-container">
			<div class="img-container">
				<img
					src="/images/about/shared/rafal-head-up.png"
					alt="Portait of Rafal looking sideways towards the light."
					class="flip" />
			</div>

			<div class="text-container">
				<Heading
					type="3"
					content="Why did I start learning web dev?"
					extraStyling="max-width: 37rem;" />
				<p>
					<span>This is an easy one.</span>
					<br />
					I made a website with squarespace for my family's business but I had a few issues with it.
					Cards not being the same height, weird font bugs etc. And I had no knowledge of how to
					solve these problems.
				</p>
				<p>That's it. I was basically annoyed with Squarespace and myself.</p>
				<p>
					Then I saw a
					<a href="https://cognosis.co.uk/">minimal website</a>
					built by a small web design and development agency,
					<a href="https://builtbybuffalo.com/">Built By Buffalo</a>
					, and that's when obsession hit. The possibilities seemed endless.
				</p>
				<p>
					Long story short, I started learning the basics in mid 2020 in my free time whilst working
					2 finance jobs. What was an interest quickly became an obsession.
				</p>
			</div>

		</div>
	</Section>
	<Section
		sectionClass="about__offer span-900 top-borders"
		extraStyling="padding-top: 7.5rem; padding-bottom: 7.5rem">
		<div class="flex-container">

			<div class="img-container">
				<img
					src="/images/about/shared/rafal-amsterdam.png"
					alt="Portait of Rafal looking sideways towards the light." />
			</div>
			<div class="text-container">
				<Heading
					type="3"
					content="COOL story nerd, what CAN YOU ACTUALLY OFFER ME?"
					extraStyling="max-width: 37rem;" />
				{#if $hiringChoice === 'employ'}
					<p>
						<strong>
							A passionate developer fixated on always learning and getting you the best result.
						</strong>
						I turned an interest into an obsession and I learn this stuff for fun in my spare time.
					</p>
					<p>
						<strong>A systemic thinker who craves readability and scalability of code.</strong>
						One of my key interests is systemising and ordering my code over time. This is partially
						why I enjoy working with CSS and, as of late, components.
					</p>
					<p>
						<strong>A team player who wants to teach and learn from others.</strong>
						Whilst I haven't coded with others and I already can imagine it's a difficult task, I
						have reviewed code of others and have given constructive feedback when asked. I have
						also developed better social skills through working in sales as well as my
						finance-analyst role which includes/d stakeholder management (build bridges instead of
						burning them).
						
					</p>
				{:else}
				<p>
					<strong>
						A passionate developer fixated on always learning and getting you the best result.
					</strong>
					I turned an interest into an obsession and I do this stuff for fun in my spare time. Making a website for someone else simply makes it a stronger motivation for me to push myself for.
				</p>
				<p>
					<strong>A systemic thinker who distils information and provides an accurate solution.</strong>
					I use my character trait of distiling information to a singular vision for the benefit of my clients. I narrow down the exact need and provide an exact solution.
				</p>
				<p>
					<strong>Straight shooter.</strong>
					I have 1 objective: deliver the best possible website to you that I can craft. I will only accept to work with someone if I truly believe I can help them. If the project is outside of my skillset and problem solving abilities or expertise, my personal ethics simply won't allow me to accept the job. Am I'm a realistic at heart - knowing what I can and can't do is somewhat of a personal expertise. 
				</p>

				{/if}
			</div>

		</div>
	</Section>
	<Section
		sectionClass="about__other-info span-900 top-borders"
		extraStyling="padding-top: 7.5rem; padding-bottom: 7.5rem">
		<div class="flex-container">
			<div class="text-container both">
				<Heading type="3" content="Other info nuggets" />
				<span class="date">Correct at 15.10.2021</span>
				<ul>
					{#each otherInfo as info}
						<li>{info}</li>
					{/each}
				</ul>
			</div>
		</div>
	</Section>
	<div class="lines" />
</Main>

<style lang="scss">
	@import '../../scss-styles/mixins';

	.flip {
		transform: scaleX(-1);
	}

	.flex-container {
		width: 100%;
		@include flex(column nowrap, center, center);
		row-gap: 3.5rem;

		.text-container {
			@include flex(column nowrap, start, center);
			gap: 1.5rem;

			p {
				max-width: 37rem;
			}

			span.date {
				margin-bottom: 1.5rem;
			}

			ul {
				max-width: 40rem;

				li {
					margin-bottom: 1.2rem;
				}
			}
		}

		.img-container {
			display: grid;
			place-items: center;
		}

		> * {
			flex: 1 0 50%;
		}

		@include mq(tablet) {
			@include eflex(row nowrap, space-between, center);
			row-gap: 0;
		}
	}
	p,
	li,
	span {
		font-family: v(roboto);
		color: v(clr-text-focused);
		transition: color 400ms;
		font-size: fluid(desktop, 1.45, 1.65);
		line-height: fluid(desktop, 1.8, 2);

		a {
			color: v(clr-text-accent-cyan);
		}
	}

	span.date {
		color: v(clr-text-faded);
		font-size: fluid(desktop, 1.45, 1.5);
		line-height: fluid(desktop, 1.45, 1.5);
	}

	p span {
		font-style: italic;
		font-weight: 700;
	}

	p strong {
		font-weight: 600;
		color: v(clr-text-accent-cyan);
	}
</style>
