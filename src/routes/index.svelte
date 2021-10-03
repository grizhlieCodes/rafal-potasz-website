<script>
	import portfolio from '$lib/stores/portfolio.js';
	import Logo from '$lib/Navigation/Logo.svelte'
    import Hero from '$lib/Home/hero/Hero.svelte'

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

<Hero />

<style lang="scss">
	@import '../scss-styles/mixins';
	
</style>
