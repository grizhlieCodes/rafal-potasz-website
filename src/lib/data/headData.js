export const headData = (name) => {
    let data = [
        {
            name: '/',
            title: 'Rafal Potasz - Web Developer',
            description: 'Rafal is a web developer that wants to capture your uniqueness within your website.',
            image: '/images/shared/social-media-image.jpg',
            url: 'https://www.rafalpotasz.com'
        },
        {
            name: '/about',
            title: 'About Rafal Potasz - Web Developer',
            description: 'Read about who Rafal\'s personal and development journey.',
            image: '/images/shared/social-media-image.jpg',
            url: 'https://www.rafalpotasz.com/about'
        }
    ]

    return {...data.find(d => d.name === name)}
}