<script>
	import portfolio from '$lib/stores/portfolio.js';
	import Logo from '$lib/Navigation/Logo.svelte'
    import Hero from '$lib/Home/hero/Hero.svelte'
	import Lines from '$lib/Decorations/Lines.svelte'
	import Main from '$lib/Core/Main.svelte'
import Philosophy from '$lib/Home/philosophy/Philosophy.svelte';

</script>

<!-- {#each $portfolio as {vimeoEmbed, name}}
	<div style="padding:56.25% 0 0 0;position:relative;">
		<iframe
			src="https://player.vimeo.com/video/{vimeoEmbed}&color=ffffff&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&autopause=0"
			style="position:absolute;top:0;left:0;width:100%;height:100%;"
			frameborder="0"
			allow="autoplay" 
            title="{name}"/>
	</div>
{/each} -->

<Main>
	<Hero />
	<Philosophy />
</Main>

<Lines />

<style lang="scss">
	@import '../scss-styles/mixins';
	// main {
	// 	grid-area: main;
	// 	@include flex(column nowrap, start, start);
	// 	gap: 12rem;
	// }

</style>
