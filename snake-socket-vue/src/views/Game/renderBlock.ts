import type food from "./food";
import type snake from "./snake";
const bgDefa = "#A9A9A9";

export function getAllBlockBg(r: number, c: number, users: Array<snake>, food: food): Array<Array<string>> {

    let blockBgs = new Array(r).fill(0).map(() => new Array(c).fill(bgDefa))

    users.forEach(user => {
        console.log(user)

        user.site.forEach(crd => {

            blockBgs[crd.x][crd.y] = user.bg

        })
    })
    blockBgs[food.site.x][food.site.y] = food.bg
    // console.log(blockBgs)
    return blockBgs
}