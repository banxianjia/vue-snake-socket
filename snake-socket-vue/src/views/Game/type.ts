// 坐标接口
interface CRD {
    x: number;
    y: number;
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
    move: () => {},
    step: () => {},
    moveLeft: () => {},
    moveRight: () => {},
    moveTop: () => {},
    moveBottom: () => {},

}