<script>
	import Section from '$lib/Core/Section.svelte';
	import Button from '$lib/Button.svelte';
    import Heading from '$lib/Decorations/Heading.svelte'
	let btnData = {
		type: 'anchor',
		link: '/about',
		btnClass: 'primary',
		content: 'ABOUT ME 🗿'
	};
    let tags = [
        'kaizen',
        'systemic',
        'scalable',
        'minimal',
        'resourceful',
        'effective',
        'intuitive',
    ]

    let mainText = [
        {
            content: 'I approach my work in an identical way to approaching my life.',
            textClass: 'bold'
        },
        {
            content: 'I give it my all and always seek to improve by perpetually remaining a student of what I do.',
            textClass: 'normal'
        },
        {
            content: 'I always seek to do everything systemically and scalably.',
            textClass: 'normal'
        },
        {
            content: 'I seek to simplify and aim for effectiveness over mere eye-candy.',
            textClass: 'normal'
        },
        {
            content: 'I remain resourceful and always find my way in a new challenge.',
            textClass: 'normal'
        },
        {
            content: "I never do anything that doesn't match my long-term vision.",
            textClass: 'normal'
        },
    ]
</script>

<Section sectionClass="philosophy">
    <div class="flex-container">
        <Heading content="my philosophy" type="2" />
        <p class="tags">
            {#each tags as tag}
                <span>#{tag} </span>
            {/each}
        </p>
        <p class="main-text">
            {#each mainText as {content, textClass}}
                 <span class="{textClass}">{content}</span>
            {/each}
        </p>
        <Button {...btnData} />
    </div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

    .flex-container {
        @include flex(column nowrap, start, start);
        gap: 1.7rem;
        font-family: v(fira);
        text-align: left;

        p.tags {
            color: v(clr-text-last);
            font-weight: 700;
            font-size: fluid(desktop, 1.3, 1.5);
            max-width: 26.5rem;
            line-height: 1.8rem;
            margin-bottom: 1rem;
        }

        p.main-text {
            color: v(clr-text-focused);
            font-size: fluid(desktop, 1.4, 1.65);
            line-height: 2rem;
            margin-bottom: 2rem;

            span {
                display: block;
                &.bold {
                    font-weight: 700;
                    text-transform: uppercase;
                }

                &:not(:nth-last-child(1)){
                    margin-bottom: 1rem;
                }

            }
        }
        
   
   }
</style>
