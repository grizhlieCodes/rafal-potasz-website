export const capitaliseFirstLetter = (string) => {
    let array = string.split('')
    array[0] = array[0].toUpperCase()
    return array.join('')
}


export const calcRealSize = (winWidth, scrollWidth) => {
    let width = winWidth - scrollWidth;
    let result
    if (width >= 1024) {
        result = 'desktop';
    } else if (width >= 768) {
        result = 'tablet';
    } else {
        result = 'mobile';
    }
    return result
};