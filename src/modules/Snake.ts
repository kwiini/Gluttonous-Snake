class Snake {
    // 蛇头，蛇身（包括舌头）
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
    }
    // 蛇头的坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value: number) {
        if (this.X === value) {
            return;
        }
        // 判断合法范围
        if(value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        // 坐标轴上不能反向移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向上发生了掉头');
            // 禁止掉头，继续向前
            if (value > this.X) { // 向右走 -> 向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value: number) {
        if (this.Y == value) {
            return;
        }
        if(value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        // 坐标轴上不能反向移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log('竖直方向上发生了掉头');
            // 禁止掉头，继续向前
            if (value > this.Y) { // 向下走 -> 向上走
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        // 检查撞到自己
        this.checkHeadBody();
    }
    // 增加 body 长度
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }
    // 身体移动
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前方身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    // 检查头撞到身子
    checkHeadBody() {
        // 获取所有身体，检查头与其重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 游戏结束
                throw new Error('撞到自己了');
            }
        }
    }
}

export default Snake;