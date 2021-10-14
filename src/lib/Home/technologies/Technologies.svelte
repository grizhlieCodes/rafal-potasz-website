<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import Badge from './Badge.svelte';
	import InfoContainer from './InfoContainer.svelte';
	import BadgesData from '$lib/stores/techBadgesData.js';
	import { getContext, createEventDispatcher } from 'svelte';
	import { flyChildren } from '$lib/scripts/animations.js';
	const dispatch = createEventDispatcher();
	let data = $BadgesData,
		size = getContext('size');

	let lastClickedIndex = null,
		badgeInfo = [];

	const updateLastClickedIndex = (e) => {
		let index = e.detail;
		if (lastClickedIndex == index) {
			lastClickedIndex = null;
			badgeInfo = [];
		} else if (lastClickedIndex == null || lastClickedIndex != index) {
			lastClickedIndex = index;
			badgeInfo = data[index].info;
		}
		dispatch('recalculateLines');
	};
</script>

<Section sectionClass="technologies span-1220">
	<div class="flex-container">
		<div
			class="top"
			use:flyChildren={['section.technologies .flex-container .top > * ', 5, 0, 0.1, true]}>
			<Heading type="2" content="Technologies" />
			<p data-direction="right">
				I focus on learning concepts and systems. I will forget syntax, I might forget defenitions,
				but I will know where to find anything I need. Repetition takes care of the rest.
			</p>
			<p>Some Technologies that I am comfortable with 💪:</p>

			<div
				class="badges-container"
				use:flyChildren={['.badges-container > .badge', 5, 0, 0.1, false]}>
				{#each data as { name, text }, i}
					<Badge
						{name}
						{text}
						index={i}
						{lastClickedIndex}
						on:clickedBadge={updateLastClickedIndex} />
				{/each}
			</div>
			<img
				src="/images/home/{$size}/tesla.png"
				alt="Nicola Tesla in black and white"
				loading="lazy" />
			{#if badgeInfo.length === 0}
				<p class="click-disclaimer">
					<span>👆</span>
					on a badge to read my thoughts
				</p>
			{/if}
		</div>
		<div class="bottom">
			{#if badgeInfo.length >= 1}
				<InfoContainer info={badgeInfo} />
			{/if}

		</div>

	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		width: 100%;
		@include flex(column nowrap, start, start);
		gap: 2.9rem;
		position: relative;
		transition: gap 250ms;

		// *:nth-child(2) {
		// 	margin-top: 1rem;
		// }

		@include mq(desktop) {
			align-items: center;
		}
	}

	.top {
		width: 100%;
		position: relative;
		@include flex(column nowrap, start, start);
		gap: 2.9rem;
		@include mq(desktop) {
			align-items: center;
		}
	}

	.bottom {
		width: 100%;
		max-width: 40rem;
		@include flex(column nowrap, start, start);
		gap: 2.9rem;
		@include mq(desktop) {
			align-items: center;
			max-width: 55rem;
		}
	}

	p {
		font-family: v(fira);
		color: v(clr-text-focused);
		font-size: fluid(desktop, 1.5, 1.65);
		max-width: 36rem;
		text-align: left;
		@include mq(desktop) {
			text-align: center;
		}

		&.click-disclaimer {
			@include flex(row nowrap, start, start);
			gap: 0.5rem;

			span {
				display: block;
				animation: pointup infinite 500ms alternate-reverse linear;
			}
		}
		@keyframes pointup {
			from {
				transform: translate(0, 0rem);
			}
			to {
				transform: translate(0, -0.5rem);
			}
		}
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

	img {
		position: absolute;
		right: 0;
		bottom: 0;
		transform: translate(63%, 4%) rotate(-27.5deg);
		transition: right 250ms, left 250ms, transform 250ms;

		@include mq(phone-wide) {
			transform: translate(57%, 8%) rotate(-18.5deg);
		}
		@include mq(phablet) {
			transform: translate(49%, 22%) rotate(-7.5deg);
		}
		@include mq(tablet) {
			transform: translate(52%, 22%) rotate(0.5deg);
		}
		@include mq(tablet-wide) {
			transform: translate(34%, 9%) rotate(0deg);
		}
		@include mq(desktop) {
			transform: translate(-46%, 14%);
			right: unset;
			left: 0;
			width: 34rem;
		}
	}
</style>
