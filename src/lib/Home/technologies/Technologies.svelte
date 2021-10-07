<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/decorations/Heading.svelte';
	import Badge from './Badge.svelte';
	const badges = [
		{ name: 'html', text: 'HTML', info: ['I have spent a considerable amount of time with HTML.',"Whilst I forget some syntax aspects like what attributes would go into a radiobutton form's I will always know where to find the information.", "I spent time experiment with symantic HTML and I find the topic rather interesting.", "The most recent finding was schema.org"] },
		{ name: 'css', text: 'CSS', info: ['Testing',]  },
		{ name: 'javascript', text: 'Javascript', info: ['Testing',]  },
		{ name: 'sass', text: 'SASS', info: ['Testing',]  },
		{ name: 'firebase', text: 'Firebase', info: ['Testing',]  },
		{ name: 'svelte', text: 'Svelte', info: ['Testing',]  },
		{ name: 'sveltekit', text: 'Sveltekit', info: ['Testing',]  },
		{ name: 'tailwind', text: 'Tailwind', info: ['Testing',]  },
		{ name: 'netlify', text: 'Netlify', info: ['Testing',]  },
		{ name: 'netlifyCms', text: 'NetlifyCMS', info: ['Testing',]  }
	];
</script>

<Section sectionClass="technologies span-1220">
	<div class="flex-container">
		<Heading type="2" content="Technologies" />
		<p>
			I focus on learning concepts and systems. I will forget syntax, I might forget defenitions,
			but I will know where to find anything I need. Repetition takes care of the rest.
		</p>
		<p>Some Technologies that I am comfortable with 💪:</p>

		<div class="badges-container">
			{#each badges as badge}
				<Badge {...badge} />
			{/each}
		</div>
	</div>

</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 2.9rem;

		*:nth-child(2) {
			margin-top: 1rem;
		}

		@include mq(desktop) {
			align-items: center;
		}
	}

	p {
		font-family: v(fira);
		color: v(clr-text-faded);
		font-size: fluid(desktop, 1.4, 1.65);
		max-width: 36rem;
		text-align: left;
		@include mq(desktop) {
			text-align: center;
		}
		// font-weight:
	}

	.badges-container {
		@include flex(row wrap, start, center);
		max-width: 23rem;
		gap: 1rem;
        transition: gap 250ms;

		@include mq(phablet) {
			max-width: 35rem;
		}

		@include mq(tablet) {
			max-width: 55rem;
		}
		@include mq(desktop) {
			justify-content: center;
		}
	}
</style>
