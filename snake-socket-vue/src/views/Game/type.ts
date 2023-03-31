// 坐标接口
export interface CRD {
    x: number;
    y: number;
}
export interface MSG {
    type: string,
    msg: string
}
export type snake = {
    bg: String;
    site: Array<CRD>;
    speed: number; // 前进速度
    point: number; // 得分
    level: number; // 等级
    over: Boolean; // 判断游戏是否结束
    fx: number; // 当前前进方向 0，1，2，3 左右上下
    row: number;
    col: number;
    name: string;
    move: () => {},
    step: () => {},
    moveLeft: () => {},
    moveRight: () => {},
    moveTop: () => {},
    moveBottom: () => {},
}
export type food = {
    site: CRD;
    bg: string;
    point: number;
}
export type res = {
    type: string,
    msg: string
}
export type rooms = {
    roomId: number,
    row: number,
    col: number,
    max: number,
    num: number,
    users: Map<number, snake>,
    food: food
}
