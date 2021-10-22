<script>
	import { flyChildren } from '$lib/scripts/animations.js';
	import Button from '$lib/Button.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import hiringChoiceStore from '$lib/stores/hiringChoice.js';

	let buttonsEmploy = [
		{
			content: 'my work 👆',
			btnClass: 'primary',
			type: 'anchor',
			link: '#portfolio-section'
		},
		{
			content: 'say hello 📧',
			btnClass: 'secondary',
			type: 'anchor',
			link: '#contact-section'
		}
	];
	let buttonsHire = [
		{
			content: 'book discovery call 🔎',
			btnClass: 'primary',
			type: 'anchor',
			link: '#contact-section'
		},
		{
			content: 'about me 🗿',
			btnClass: 'secondary',
			type: 'anchor',
			link: '/about'
		}
	];
</script>

{#if $hiringChoiceStore === 'hire'}
	<div
		class="hero-text-container"
		use:flyChildren={['section.hero .hero-text-container > *', 5, 0, 0]}>
		<Heading content="Websites for" content2="Passionate" content3="People" type="1-hire" headingClass="hire-header" />
		<p data-direction="right">
			Hello 👋, I'm Rafal. I'm all about building beautifully elegant websites that you and your clients will love.
		<div class="hero-text-container__cta-container" data-direction="left">
			{#each buttonsHire as data}
				<Button {...data} />
			{/each}
		</div>
	</div>
{:else}
	<div
		class="hero-text-container"
		use:flyChildren={['section.hero .hero-text-container > *', 5, 0, 0]}>
		<Heading content="No-nonsense" content2="web developer" type="1" />
		<p data-direction="right">
			Hello 👋, I'm Rafal, a self-taught front-end web developer with an eye for design, obsessively
			learning towards mastery of front-end design and development.
		</p>
		<div class="hero-text-container__cta-container" data-direction="left">
			{#each buttonsEmploy as data}
				<Button {...data} />
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../../../scss-styles/mixins';
	.hero-text-container {
		width: 100%;
		@include flex(column nowrap, start, center);
		gap: 2rem;
		font-family: v(fira);
		text-align: center;

		@include mq(tablet) {
			flex-grow: 1;
			text-align: left;
			align-items: start;
		}

		h1 {
		}

		p {
			max-width: 34rem;
			margin-bottom: 2rem;
			font-size: 1.8rem;
			color: v(clr-text-focused);
			transition: color 400ms;
			line-height: 2.3rem;
			font-weight: 700;

			@include mq(tablet) {
				flex-grow: 1;
				width: auto;
				max-width: 34rem;
			}

			@include mq(desktop) {
				max-width: 40rem;
			}
		}

		&__cta-container {
			@include flex(row nowrap, start, center);
			gap: 2.6rem;
		}
	}
</style>
