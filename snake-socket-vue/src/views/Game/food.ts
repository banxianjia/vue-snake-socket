import type snake from "./snake";

// 坐标接口
interface CRD {
    x: number;
    y: number;
}
// 食物坐标
let foodSite: CRD;
// 食物背景色池
const foodBgs = ["#B22222", "#A52A2A", "#FF0000", "#CD5C5C"];
// 生成食物坐标
function buildFood(row: number, col: number, users: Array<snake>) {
    foodSite = {
        x: Math.floor(Math.random() * row),
        y: Math.floor(Math.random() * col),
    };
    let snake_site: Array<CRD> = [];

    users.forEach(user => {
        snake_site = snake_site.concat(user.site);
    })
    // console.log(snake_site);
    snake_site.forEach(crd => {
        if (
            foodSite.x === crd.x &&
            foodSite.y === crd.y
        ) {
            buildFood(row, col, users);
        }
    })

}
export default class food {
    site: CRD;
    bg: string;
    point: number;
    constructor(row: number, col: number, users: Array<snake>) {
        // 初始化食物位置
        buildFood(row, col, users);
        this.site = foodSite
        // 初始化食物颜色
        const bgIndex = Math.floor(Math.random() * foodBgs.length);
        this.bg = foodBgs[bgIndex];
        this.point = 10;
    }
}