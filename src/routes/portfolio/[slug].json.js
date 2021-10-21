import portfolio from '$lib/stores/portfolio.js'

export async function get({ page }) {
    let { slug } = page.params

    console.log('jsonfile', slug)
}