// 对游戏的各种操作
interface CRD {
    x: number,
    y: number
}

// 蛇身移动
function move(site: Array<CRD>) {
    site.reduce((previousValue, currentValue, currentIndex, array) => {
        let value = currentValue
        array[currentIndex] = previousValue
        return value;
    })
    console.log(site);
    return site;
}


