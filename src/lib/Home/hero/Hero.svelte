<script>

	import HeroImage from './HeroImage.svelte';
	import HeroText from './HeroText.svelte';
	import Section from '$lib/Core/Section.svelte';
	import { getContext } from 'svelte';

	let size = getContext('size');
</script>

<Section sectionClass="hero span-1220" >
	<div class="flex-container">
		<HeroImage />
		<HeroText />
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		width: 100%;
		max-width: 111rem;
		@include flex(column nowrap, start, center);
		gap: 6rem;

		@include mq(tablet) {
			@include eflex(row-reverse nowrap, space-between, center);
		}
	}
</style>
