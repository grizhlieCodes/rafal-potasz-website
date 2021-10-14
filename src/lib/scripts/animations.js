// Fly single item from left or right
const duration = 1.5

function removeStyles(){
    let targets = this.targets()
    targets.forEach(target => {
        target.style.removeProperty('opacity')
        target.style.removeProperty('transform')
    })
}

export const flyItem = (node, [x = 0, y = 0, delay = 0, index = 0]) => {
    const directionData = node.dataset.direction
    const leftRight = directionData === 'right' ? '' : '-';
    gsap.from(node, {
        scrollTrigger: {
            trigger: node
        },
        x: `${leftRight}${x}rem`,
        y: `${y}rem`,
        opacity: 0,
        duration: duration,
        delay: delay * index,
        onComplete: removeStyles
    })
}



export const flyChildren = (node, [selector, x = 0, y = 0, delay = 0]) => {
    let items = [...document.querySelectorAll(`${selector}`)]
    items.forEach((item, index) => {
        flyItem(item, [x, y, delay, index])
    })
}


export const moveOnScroll = (node, distance) => {
    const nodeClass = node.classList[0]
    const value = distance
    const top = `-${value}rem`
    const bottom = `${value}rem`
    const left = `-${value}rem`
    const right = `${value}rem`
    const startVal = '-50%'

    if (nodeClass === 'rafal') {
        return
    }

    if (nodeClass === 'computer') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1,
            },
            y: bottom,
        })
        return
    }

    if (nodeClass === 'eagle') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1
            },
            // opacity: 1,
            x: right,
            y: bottom,
        })
        return
    }

    if (nodeClass === 'book') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1
            },
            x: left,
            y: bottom,
        })
        return
    }

    if (nodeClass === 'watch') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1
            },
            x: left,
        })
        return
    }

    if (nodeClass === 'rust') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1
            },
            x: left,
            y: top,
        })
        return
    }

    if (nodeClass === 'statue') {
        gsap.to(node, {
            scrollTrigger: {
                trigger: node,
                start: startVal,
                end: "bottom 0%",
                scrub: 1,
            },
            // opacity: 1,
            x: right,
            y: top,
        })
        return
    }

}