export const repositionToProjects = (height = 0) => {
    let portfolioSectionHeight = height;
    const portfolioSection = document.querySelector('section.portfolio');
    const sectionHeight = parseInt(
        window.getComputedStyle(portfolioSection).getPropertyValue('height')
    );
    if (portfolioSectionHeight !== sectionHeight) {
        console.log(`Did not match, original: ${portfolioSectionHeight}, new: ${sectionHeight}`)
        repositionToProjects(sectionHeight);
    } else {
        console.log(`Matched, original: ${portfolioSectionHeight}, new: ${sectionHeight}`)
        setTimeout(() => {
            const top = portfolioSection.getBoundingClientRect().top;
            const scrollTop = window.pageYOffset;
            const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
            console.log(top, scrollTop, clientTop);
            const yPos = top + scrollTop - clientTop;
            window.scrollTo(0, yPos);
        }, 1000)
    }
};