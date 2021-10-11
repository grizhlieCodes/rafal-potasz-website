<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import Button from '$lib/Button.svelte';

	const submitForm = (e) => {
		e.preventDefault();
	};
</script>

<Section sectionClass="contact-form span-900">
	<div class="flex-container">
		<Heading type="2" content="SAY HELLO!" />
		<p>
			Whether you want to hire me or discuss a project, contact me below. I'll be happy to hear from
			you 😁.
		</p>
		<div class="form-container">
			<img
				class="img__rafal"
				src="/images/shared/rafal-smiling-arthurs-peak.png"
				alt="Rafal, the website owner, smiling whilst standing on arthurs peak in scotland" />
			<img
				class="img__bottle"
				src="/images/shared/message-in-bottle.png"
				alt="Rafal, the website owner, smiling whilst standing on arthurs peak in scotland" />
			<form name="contact" method="POST" netlify>
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="Email" />
				<textarea name="message" id="message" cols="30" rows="3" placeholder="Message" />
				<Button type="submit" btnClass="primary" content="SEND 🚀" />
			</form>
		</div>
	</div>
</Section>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.flex-container {
		@include flex(column nowrap, start, start);
		gap: 2rem;
		width: 100%;

		@include mq(desktop) {
			align-items: center;
		}

		p {
			font-family: v(fira);
			color: v(clr-text-focused);
			font-size: fluid(desktop, 1.4, 1.65);
			margin-bottom: 4rem;
			max-width: 35rem;

			@include mq(desktop) {
				text-align: center;
			}
		}

		.form-container {
			display: grid;
			width: 100%;
			grid-template-columns: 2.4rem 1fr 2.4rem;
			grid-template-rows: 15rem 6.8rem max-content 1.5rem 11rem;

			@include mq(tablet) {
				grid-template-columns: minmax(14.5rem, 26rem) minmax(38rem, 45rem) minmax(14.5rem, 26rem);
				grid-template-rows: 3rem max-content 12rem 3rem max-content;
			}

			form {
				background: v(clr-form-bg);
				width: 100%;
				height: max-content;
				// padding: 4rem 2rem;
				@include py(fluid(desktop, 4, 5.5));
				@include px(fluid(desktop, 2, 4.5));
				@include flex(column nowrap, start, start);
				gap: 2rem;
				max-width: 45rem;
				justify-self: center;
				-webkit-box-shadow: -1px 0px 15px -3px rgba(0, 0, 0, 0.55),
					-1px 0px 15px -3px rgba(0, 0, 0, 0.55);
				box-shadow: -1px 0px 15px -3px rgba(0, 0, 0, 0.55);

				grid-column: 2/3;
				grid-row: 2/5;

				input,
				textarea {
					width: 100%;
					background: v(clr-form-input-bg);
					outline: none;
					border: none;
					font-family: v(roboto);
					color: v(clr-text-focused);
					padding: 1rem 1rem;
					font-size: fluid(desktop, 1.45, 1.6);
					transition: transform 250ms;

					&:focus-within,
					&:focus {
						box-shadow: none;

						transform: scale(1.05);
					}
				}

				input:-webkit-autofill,
				input:-webkit-autofill:focus,
				input:-webkit-autofill:hover input:-webkit-autofill {
					border: none;
					-webkit-text-fill-color: v(clr-text-focused);
					-webkit-box-shadow: 0 0 0 1000px v(clr-form-input-bg) inset;
				}

				textarea {
					resize: none;
				}
			}

			img {
				width: 60vw;
				&.img__rafal {
					grid-column: 1 / 3;
					grid-row: 1 / 3;
					max-width: 30rem;

					@include mq(tablet) {
						grid-column: 1 / 2;
						grid-row: 1 / 5;
					}
				}
				&.img__bottle {
					grid-column: 1 / 3;
					grid-row: 4 / 6;
					max-width: 33rem;

					@include mq(tablet) {
						grid-column: 2 / 4;
						grid-row: 3 / 6;
						justify-self: end;
					}
				}
			}
		}
	}
</style>
