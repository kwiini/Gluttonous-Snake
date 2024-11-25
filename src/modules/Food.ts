// 食物
class Food {
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!; // ! 表示不可能为空
    }
    // 获取坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    // 修改位置
    change() {
        // 随机位置 0 ~ 290
        // 移动一次一格，所以食物坐标为整十
        let left = Math.round(Math.random() * 29) * 10; // 四舍五入
        let top = Math.round(Math.random() * 29) * 10; // 四舍五入
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
// test
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

export default Food;