<script context="module">
	import portfolio from '$lib/data/portfolio.js'

	const loadProjectData = (key) => {
		let data = portfolio()
		return data.find(p => p.name === key)
	}

	export async function load({ page }) {
		const { slug } = page.params;
		const projectData = await loadProjectData(slug)
		return {
			props: {
				projectData
			}
		};
	}
</script>

<script>
	export let projectData;
	console.log(projectData)
</script>

<style lang="scss">

</style>
