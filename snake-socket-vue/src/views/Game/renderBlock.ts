import type { Ref } from "vue";
import type food from "./food";
import type snake from "./snake";
const bgDefa = "#A9A9A9";

// 初始化地图背景
export function getInitBlockBg(r: number, c: number): Array<Array<string>> {
    let blockBgs = new Array(r).fill(0).map(() => new Array(c).fill(bgDefa));
    return blockBgs;
}
//  渲染蛇背景
export function renderSnake(users: Array<snake>, blockBgs: Array<Array<string>>): Array<Array<string>> {
    users.forEach(user => {
        // console.log(user)
        user.site.forEach(crd => {
            blockBgs[crd.x][crd.y] = user.bg
        })
    })
    return blockBgs;
}
// 渲染食物背景
export function renderFood(food: food, blockBgs: Array<Array<string>>): Array<Array<string>> {
    blockBgs[food.site.x][food.site.y] = food.bg
    return blockBgs;
}
// 清除蛇
export function renderClearSnake(user: snake, blockBgs: Array<Array<string>>): Array<Array<string>> {

    console.log(user)
    user.site.forEach(crd => {
        blockBgs[crd.x][crd.y] = bgDefa
    })

    return blockBgs;
}
// 清除食物
export function renderClearFood(food: food, blockBgs: Array<Array<string>>): Array<Array<string>> {
    blockBgs[food.site.x][food.site.y] = bgDefa
    return blockBgs;
}

// export function getAllBlockBg(r: number, c: number, users: Array<snake>, food: food): Array<Array<string>> {

//     let blockBgs = new Array(r).fill(0).map(() => new Array(c).fill(bgDefa))

//     users.forEach(user => {
//         console.log(user)

//         user.site.forEach(crd => {

//             blockBgs[crd.x][crd.y] = user.bg

//         })
//     })
//     blockBgs[food.site.x][food.site.y] = food.bg
//     // console.log(blockBgs)
//     return blockBgs
// }