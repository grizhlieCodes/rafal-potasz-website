<script>
    export let project

    $: vimeoEmbed = project.vimeoEmbed
    $: name = project.name
</script>

<div style="padding:56.25% 0 0 0;position:relative;">
    <iframe
        src="https://player.vimeo.com/video/{vimeoEmbed}&color=ffffff&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1&autopause=0"
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        frameborder="0"
        allow="autoplay" 
        title="{name}"/>
</div>

<style lang="scss">
    @import '../../../scss-styles/mixins';

    div {
        aspect-ratio: 16 / 9;
        width: 100%;
        flex: 1 0 100%;
        border: 0.2rem solid v(clr-text-focused);

        @include mq(desktop){
            height: auto;
            flex: 1 0 77.5rem;
        }
    }
    iframe {
        pointer-events: none;
    }
</style>