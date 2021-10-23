<script context="module">
	export const prerender = true;
</script>

<script>
	import Hero from '$lib/Home/hero/Hero.svelte';
	import EmployLines from '$lib/Decorations/EmployLines.svelte';
	import Main from '$lib/Core/Main.svelte';
	import Philosophy from '$lib/Home/philosophy/Philosophy.svelte';
	import Technologies from '$lib/Home/technologies/Technologies.svelte';
	import Portfolio from '$lib/Home/portfolio/Portfolio.svelte';
	import ContactForm from '$lib/Home/contact-form/ContactForm.svelte';
	import hiringChoiceStore from '$lib/stores/hiringChoice.js';
	import HardWebsites from '$lib/Home/HardWebsites.svelte'
	import HowItWorks from '$lib/Home/HowItWorks.svelte'
	import DarkMode from '$lib/stores/darkmode.js'
	import HireLines from '$lib/Decorations/HireLines.svelte'
	import { onMount } from 'svelte';
	
	let employLinesComp;
	let hireLinesComp;

	const recalculateLines = () => {
		if($hiringChoiceStore === 'employ'){
			employLinesComp.rerunLines();
		} else {
			hireLinesComp.rerunLines();
		}
	};

	let mounted = false;

	onMount(() => {
		mounted = true;
		DarkMode.checkDarkmode()
	});

	const scrollToPortfolio = () => {
		const href = window.location.href;
		if (href.includes('#portfolio-section')) {
			setTimeout(() => {
				const portfolioSection = document.querySelector('#portfolio-section');
				window.scrollTo(0, portfolioSection.offsetTop);
			}, 600);
		}
	};

	$: if (mounted) {
		scrollToPortfolio();
	}
</script>

<Main marginBottom="10">
	<Hero />
	{#if $hiringChoiceStore === 'employ'}
		<Philosophy />
		<Technologies on:recalculateLines={recalculateLines} />
	{:else}
		<!-- else content here -->\
		<HardWebsites />
		<HowItWorks />
	{/if}
	<Portfolio on:recalculateLines={recalculateLines} />
	<ContactForm />
</Main>

{#if $hiringChoiceStore === 'employ'}
	 <EmployLines bind:this={employLinesComp} />
{:else}
		<HireLines bind:this={hireLinesComp} />
{/if}

<style lang="scss">
	@import '../scss-styles/mixins';
</style>
