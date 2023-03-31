// 蛇背景色池
const snakesBgs = ["#FFB6C1", "#DC143C", "#EE82EE", "#800080"];
// 随机初始化蛇位置
function randomInitSnakeSite(row, col) {
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
module.exports = class snake {
    constructor(row, col, name, bg) {
        const bgIndex = Math.floor(Math.random() * snakesBgs.length);
        let obj = randomInitSnakeSite(row, col);
        this.bg = bg;// 初始化蛇颜色
        this.site = obj.site;// 初始化蛇位置
        this.speed = 1000;
        this.point = 0;
        this.level = 1;
        this.over = false;
        this.fx = obj.mode * 2
        this.row = row;
        this.col = col;
        this.name = name
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
    // mode，执行类型：0，1，2，3 左右上下
    step = (mode) => {
        // 移动身体
        this.move();

        // 移动头
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

        if (
            this.site[0].y < 0 ||
            this.site[0].y >= this.col ||
            this.site[0].x < 0 ||
            this.site[0].x >= this.row
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
        }
    }
    // 向左
    moveLeft = () => {
        if (!this.over && this.fx != 1) {
            this.fx = 0;
            this.step(0)
        }
    }
    // 向右
    moveRight = () => {
        if (!this.over && this.fx != 0) {
            this.fx = 1;
            this.step(1)
        }
    }
    // 向上
    moveTop = () => {
        if (!this.over && this.fx != 3) {
            this.fx = 2;
            this.step(2)
        }
    }
    // 向下
    moveBottom = () => {
        if (!this.over && this.fx != 2) {
            this.fx = 3;
            this.step(3)
        }
    }
}