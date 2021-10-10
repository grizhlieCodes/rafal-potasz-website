<script>
	export let project;

	$: vimeoEmbed = project.vimeoEmbed;
	$: name = project.name;
</script>

<div class="video-container">
    <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe
            src="https://player.vimeo.com/video/{vimeoEmbed}&color=ffffff&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&autopause=0&background=1"
            style="position:absolute;top:0;left:0;width:100%;height:100%;"
            frameborder="0"
            allow="autoplay"
            title={name} />
    </div>
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	//Fix below to give max-width as per design. Don't use aspect ratio, not supported by most safari users sadly.

	.video-container {
		width: 100%;
		border: 0.2rem solid v(clr-text-focused);

		@include mq(desktop) {
            max-width: 77.5rem;
		}
	}
	iframe {
		pointer-events: none;
	}
</style>

<!-- 775, 443 -->