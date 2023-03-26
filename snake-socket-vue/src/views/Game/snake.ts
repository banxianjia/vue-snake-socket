import { render } from "vue";
import food from "./food";
import { renderClearFood, renderClearSnake, renderFood, renderSnake } from "./renderBlock";
// 蛇背景色池
const snakesBgs = ["#FFB6C1", "#DC143C", "#EE82EE", "#800080"];
// 坐标接口
interface CRD {
    x: number;
    y: number;
}
// 初始化蛇返回接口
interface INITSNAKE {
    // 位置
    site: Array<CRD>,
    // 方式0横排，1竖排
    mode: number
}
// 随机初始化蛇位置
function randomInitSnakeSite(row: number, col: number): INITSNAKE {
    const xi = Math.floor(Math.random() * (row - 2));
    const yi = Math.floor(Math.random() * (col - 2));
    const type = [
        [
            { x: xi, y: yi },
            { x: xi, y: yi + 1 },
            { x: xi, y: yi + 2 },
        ], // 横排
        [
            { x: xi, y: yi },
            { x: xi + 1, y: yi },
            { x: xi + 2, y: yi },
        ], // 竖排
    ];
    const siteIndex = Math.floor(Math.random() * 2);
    return {
        site: type[siteIndex],
        mode: siteIndex
    };
}


// 蛇类
export default class snake {
    site: Array<CRD>;
    bg: string;
    speed: number; // 前进速度
    point: number; // 得分
    level: number; // 等级
    over: Boolean; // 判断游戏是否结束
    fx: number; // 当前前进方向 0，1，2，3 左右上下
    timer: number; // 定时器
    constructor(row: number, col: number, snakesSites?: Array<CRD>) {

        const bgIndex = Math.floor(Math.random() * snakesBgs.length);
        let obj = randomInitSnakeSite(row, col);

        this.bg = snakesBgs[bgIndex];// 初始化蛇颜色
        this.site = obj.site;// 初始化蛇位置
        this.speed = 600;
        this.point = 0;
        this.level = 1;
        this.over = false;
        this.fx = obj.mode * 2
        this.timer = 0;
    };
    // 碰撞检测
    collide = (users: Array<snake>) => {
        // 蛇头坐标
        let h = [this.site[0].x, this.site[0].y];

        let snake_site: Array<CRD> = [];
        users.forEach(user => {
            snake_site = snake_site.concat(user.site);
        })
        // console.log(snake_site);
        let result = snake_site.filter(crd => crd.x === h[0] && crd.y === h[1])
        if (result.length >= 2) {
            console.log("蛇头碰到蛇体了！！！！");
            this.over = true;
            clearInterval(this.timer);
        }
    }
    // 吃食物
    // hi 头行，hj 头列 ti 移动前尾行 tj 移动前尾列
    eat = (foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        // 蛇头坐标
        let h = [this.site[0].x, this.site[0].y];
        if (h[0] === foods.site.x && h[1] === foods.site.y) {
            /** 吃食物蛇各数据变化机制 */
            renderClearFood(foods, blockBgs)
            renderSnake([this], blockBgs);
            renderFood(new food(20, 20, users), blockBgs)

            // console.log(this);
        }
    }
    // 蛇身移动
    move = () => {
        this.site.reduce((previousValue, currentValue, currentIndex, array) => {
            let value = currentValue
            array[currentIndex] = previousValue
            return value;
        })
        // console.log(this.site);
    }
    // 定时执行函数
    // user 玩家id, mode，执行类型：0，1，2，3 左右上下
    interval = (mode: number, foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        // 1.清空
        let that = this
        renderClearSnake(that, blockBgs);
        // 2. 移动身体
        this.move();
        // console.log(this.site)
        // 3. 移动头
        let site = this.site[0];
        if (mode === 0) {
            site = { x: this.site[0].x, y: this.site[0].y - 1 };
        } else if (mode === 1) {
            site = { x: this.site[0].x, y: this.site[0].y + 1 }
        } else if (mode === 2) {
            site = { x: this.site[0].x - 1, y: this.site[0].y }
        } else if (mode === 3) {
            site = { x: this.site[0].x + 1, y: this.site[0].y }
        }
        this.site[0] = site;
        // console.log(this.site)

        this.collide(users);
        this.eat(foods, blockBgs, users);
        if (
            this.site[0].y < 0 ||
            this.site[0].y >= 20 ||
            this.site[0].x < 0 ||
            this.site[0].x >= 20
        ) {
            this.over = true;
            console.log("撞墙了!!!!");

            if (mode === 0) {
                this.site[0].y++;
            } else if (mode === 1) {
                this.site[0].y--;
            } else if (mode === 2) {
                this.site[0].x++;
            } else if (mode === 3) {
                this.site[0].x--;
            }
            clearInterval(this.timer);
        }
        renderSnake([this], blockBgs);
    }
    // 向左
    moveLeft = (foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        if (!this.over && this.fx != 1) {
            this.fx = 0;
            if (this.timer != 0) {
                clearInterval(this.timer);
                this.timer = 0;
            }
            this.interval(0, foods, blockBgs, users);
            if (!this.over) {
                this.timer = setInterval(
                    this.interval,
                    this.speed,
                    0, foods, blockBgs, users
                );
            }
        }
    }
    // 向右
    moveRight = (foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        if (!this.over && this.fx != 0) {
            this.fx = 1;
            if (this.timer != 0) {
                clearInterval(this.timer);
                this.timer = 0;
            }
            this.interval(1, foods, blockBgs, users);
            if (!this.over) {
                this.timer = setInterval(
                    this.interval,
                    this.speed,
                    1, foods, blockBgs, users
                );
            }
        }
    }
    // 向上
    moveTop = (foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        if (!this.over && this.fx != 3) {
            this.fx = 2;
            if (this.timer != 0) {
                clearInterval(this.timer);
                this.timer = 0;
            }
            this.interval(2, foods, blockBgs, users);
            if (!this.over) {
                this.timer = setInterval(
                    this.interval,
                    this.speed,
                    2,
                    foods, blockBgs, users
                );
            }
        }
    }
    // 向下
    moveBottom = (foods: food, blockBgs: Array<Array<string>>, users: Array<snake>) => {
        if (!this.over && this.fx != 2) {
            this.fx = 3;
            if (this.timer != 0) {
                clearInterval(this.timer);
                this.timer = 0;
            }
            this.interval(3, foods, blockBgs, users);
            if (!this.over) {
                this.timer = setInterval(
                    this.interval,
                    this.speed,
                    3,
                    foods, blockBgs, users
                );
            }
        }
    }
}