<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import { getContext } from 'svelte';
	let size = getContext('size');
</script>

<Section sectionClass="how-it-works-section span-1220">
    <div class="flex-container">
        <Heading type="2" content="how it works" />
        <div class="cards-container">
            
        </div>
    </div>
</Section>


<style lang="scss">
	@import '../../scss-styles/mixins';
</style>
