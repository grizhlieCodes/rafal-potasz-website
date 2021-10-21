export const capitaliseFirstLetter = (string) => {
    let array = string.split('')
    array[0] = array[0].toUpperCase()
    return array.join('')
}


export const calcRealSize = (winWidth, scrollWidth) => {
    let width = winWidth - scrollWidth;
    let result
    if (width >= 1240) {
        result = 'desktop';
    } else if (width >= 768) {
        result = 'tablet';
    } else {
        result = 'mobile';
    }
    return result
};

export const setHeroImgHeight = (container) => {
    const imagesContainer = container.querySelector('.images-container');
    const firstImage = imagesContainer.querySelector('img:nth-of-type(1)');
    const firstImageHeight = firstImage.getBoundingClientRect().height;
    container.style.height = firstImageHeight + 'px';
}

export const displayDate = (date) => {
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',]
    let day = date.getDate().toString().length < 2 ? "0" + date.getDate().toString() : date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    return `${day}-${month}-${year}`
}