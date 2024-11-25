// 记分牌
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置变量限制等级
    maxlevel: number;
    // 设置变量表示升级指标
    upScore: number;
    constructor(maxlevel: number = 10, upScore: number = 3) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxlevel = maxlevel;
        this.upScore = upScore;
    }
    // 加分
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        // 判断分数
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    // 等级提升
    levelUp() {
        if (this.level < this.maxlevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}
// test
// const scorePanel = new ScorePanel(100, 2);
// for (let i = 0; i < 200; i++) {
//     scorePanel.addScore();
// }

export default ScorePanel;