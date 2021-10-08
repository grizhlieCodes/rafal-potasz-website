<script>
    import {capitaliseFirstLetter} from '$lib/scripts/helperFunctions'
    export let project
    import Icon from '$lib/Decorations/Icon.svelte'

    $: name = project.name
    $: subtitle = project.subtitle
    $: description = project.description
</script>

    <div class="text-container">
        <h3 class="project-name">{capitaliseFirstLetter(name)}</h3>
        <p class="subtitle">{subtitle}</p>
        <p class="description">{description[0]}</p>
        <a href="/" class="view-project-button">
            <p>VIEW PROJECT </p>
            <Icon name="arrow-right" width="1.4rem" />
        </a>
    </div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

    :global(.view-project-button svg path){
        fill: v(clr-text-accent-cyan);
    }

    :global(.view-project-button svg) {
        transform: translateY(-0.1rem);
    }

    .text-container {
        @include flex(column nowrap, start, start);
        gap: 1.4rem;
        font-family: v(fira);

        h3.project-name {
            color: v(clr-text-focused);
            font-size: fluid(desktop, 2.2, 3);
        }
        p.subtitle {
            color: v(clr-text-faded);
            font-size: fluid(desktop, 1.4, 1.6);
        }
        p.description {
            color: v(clr-text-focused);
            font-size: fluid(desktop, 1.4, 1.6);
        }

        a.view-project-button {
            @include flex(row nowrap, start, center);
            gap: 0.95rem;
            color: v(clr-text-accent-cyan);
            transition: transform 250ms;

            &:hover {
                transform: scale(1.1, 1.1) translate(0.6rem, 0);


            }

            p {
                font-size: fluid(desktop, 1.4, 1.6);
            }
        } 
    }

</style>
