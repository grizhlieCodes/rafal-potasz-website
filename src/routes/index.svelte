<script context="module">
	export const prerender = true;
</script>

<script>
	import portfolio from '$lib/stores/portfolio.js';
	import Logo from '$lib/Navigation/Logo.svelte';
	import Hero from '$lib/Home/hero/Hero.svelte';
	import Lines from '$lib/Decorations/Lines.svelte';
	import Main from '$lib/Core/Main.svelte';
	import Philosophy from '$lib/Home/philosophy/Philosophy.svelte';
	import Technologies from '$lib/Home/technologies/Technologies.svelte';
	import Portfolio from '$lib/Home/portfolio/Portfolio.svelte';
	import ContactForm from '$lib/Home/contact-form/ContactForm.svelte';
	import { onMount } from 'svelte';
	let linesComp;

	const recalculateLines = () => {
		linesComp.rerunLines();
	};
	
	let mounted = false;

	onMount(() => {
		mounted = true
	});

	const scrollToPortfolio = () => {
		const href = window.location.href
		if(href.includes('#portfolio-section')){
			setTimeout(() => {
				const portfolioSection = document.querySelector('#portfolio-section');
				window.scrollTo(0, portfolioSection.offsetTop);
			}, 600);
		}
	};

	$: if(mounted){
		scrollToPortfolio()
	}
</script>

<Main marginBottom="10">
	<Hero />
	<Philosophy />
	<Technologies on:recalculateLines={recalculateLines} />
	<Portfolio on:recalculateLines={recalculateLines} />
	<ContactForm />
</Main>

<Lines bind:this={linesComp} />

<style lang="scss">
	@import '../scss-styles/mixins';
</style>
