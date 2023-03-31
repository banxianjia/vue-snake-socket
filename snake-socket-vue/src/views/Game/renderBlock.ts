
import type { food, snake } from "./type";
const bgDefa = "#A9A9A9";


// 渲染计算地图各方块背景色
export function renderBlocks(users: Array<snake>, foods?: food) {
    const r = users[0].row;
    const c = users[0].col;
    console.log(r, c)
    let blockBgs = new Array(r).fill(0).map(() => new Array(c).fill(bgDefa));
    console.log(users)
    users.forEach(user => {
        console.log(user)
        user.site.forEach(crd => {
            blockBgs[crd.x][crd.y] = user.bg
        })
    })
    console.log(foods)
    if (foods) {
        blockBgs[foods.site.x][foods.site.y] = foods.bg
    }
    console.log(blockBgs)
    return blockBgs;
}

