<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/decorations/Heading.svelte';
	import Badge from './Badge.svelte';
	import InfoContainer from './InfoContainer.svelte';
	let data = [
		{
			type: 'badge',
			name: 'html',
			text: 'HTML',
			info: [
				'I have spent a considerable amount of time with HTML.',
				"Whilst I forget some syntax aspects like what attributes would go into a radiobutton form's I will always know where to find the information.",
				'I spent time experiment with symantic HTML and I find the topic rather interesting.',
				'The most recent finding was schema.org'
			]
		},
		{ type: 'badge', name: 'css', text: 'CSS', info: ['Testing2'] },
		{ type: 'badge', name: 'javascript', text: 'Javascript', info: ['Testing3'] },
		{ type: 'badge', name: 'sass', text: 'SASS', info: ['Testing4'] },
		{ type: 'badge', name: 'firebase', text: 'Firebase', info: ['Testing5'] },
		{ type: 'badge', name: 'svelte', text: 'Svelte', info: ['Testing6'] },
		{ type: 'badge', name: 'sveltekit', text: 'Sveltekit', info: ['Testing7'] },
		{ type: 'badge', name: 'tailwind', text: 'Tailwind', info: ['Testing8'] },
		{ type: 'badge', name: 'netlify', text: 'Netlify', info: ['Testing9'] },
		{ type: 'badge', name: 'netlifyCms', text: 'NetlifyCMS', info: ['Testing10'] }
	];

	const removeInfo = () => {
		let tempData = [...data];
		tempData.splice(2, 1);
		data = tempData;
	};

	const clearInfoFromData = () => {
		data = data.filter((d) => d.type === 'badge');
	};

	let lastClickedIndex = null,
		badgeInfo = [];

	const showInfo = (index) => {
		if (lastClickedIndex) lastClickedIndex = index;

		clearInfoFromData();
		let clickedItem = { ...data[index] };
		let tempData = [...data];
		tempData.splice(index + 1, 0, { type: 'info', info: clickedItem.info });
		data = tempData;
	};

	const updateLastClickedIndex = (e) => {
		let index = e.detail;
		console.log(index, lastClickedIndex);
		if (lastClickedIndex == index) {
			lastClickedIndex = null;
			badgeInfo = [];
			return;
		}
		if (lastClickedIndex == null || lastClickedIndex != index) {
			lastClickedIndex = index;
			badgeInfo = data[index].info;
		}
	};
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
			{#each data as { name, text }, i}
				<Badge
					{name}
					{text}
					index={i}
					{lastClickedIndex}
					on:clickedBadge={updateLastClickedIndex} />
			{/each}
			{#if badgeInfo.length >= 1}
				<InfoContainer info={badgeInfo} />
			{/if}
		</div>
		{#if badgeInfo.length === 0}
			<p class="click-disclaimer">👆 on a badge to read my thoughts</p>
		{/if}
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 2.9rem;

		// *:nth-child(2) {
		// 	margin-top: 1rem;
		// }

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
