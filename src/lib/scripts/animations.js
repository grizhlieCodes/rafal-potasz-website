// Fly single item from left or right

// gsap.registerPlugin(ScrollTrigger);
export const flyItem = (node, [direction, delay = 0, index = 0]) => {
    gsap.from(node, {
        scrollTrigger: {
            trigger: node,
        },
        x: direction,
        duration: 0.15,
        opacity: 0,
        delay: delay * index
    })
}

//Fly multiple items with a delay
export const flyMultipleItems = (node, direction, itemNode) => {
    let items = [...node.querySelectorAll("a")]
    items.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                markers: 1,
            },
            x: direction,
            duration: 0.5,
            delay: 0.5 + (index * 0.5)
        })
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