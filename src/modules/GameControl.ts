import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 存储蛇的移动方向（即按键）
    direction: string = '';
    // 判断游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    // 初始化
    init() {
        // 绑定键入按键
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 开始移动
        this.run();
    }
    // 键盘 down 响应函数
    keydownHandler(event: KeyboardEvent) {
        // 检查按键合法性
        // 修改 direction
        this.direction = event.key;
    }
    // 控制蛇移动
    run() {
        // 获取坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 修改元素
        switch (this.direction) {
            case 'ArrowUp':
            case "Up":
                Y -= 10;
                break;
            case 'ArrowDown':
            case "Down":
                Y += 10;
                break;
            case 'ArrowLeft':
            case "Left":
                X -= 10;
                break;
            case 'ArrowRight':
            case "Right":
                X += 10;
                break;
        }
        // 检查蛇是否吃到食物
        this.checkEat(X, Y)
        // 修改坐标
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            alert((error as Error).message + '! Game Over!');
            this.isLive = false;
        }
        // 开始定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30); 
    }
    // 吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到食物了');
            // 重置食物位置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇身增加
            this.snake.addBody();
        }
    }
}

export default GameControl;