import { Ball } from "./Ball.js"

class Pitch extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    scene.load.image('bg', 'img/board.png');

    console.log('pitch');
    const bg = scene.add.image(scene.sys.game.scale.gameSize.width/2, scene.sys.game.scale.gameSize.height/2, 'bg');
    // const bg = scene.add.image(x, y, 'bg');
    // const bgScale = window.innerWidth / 800;
    // bg.setScale(bgScale);
  
    scene.add.existing(this);

    let ball = new Ball(scene, 0, 0);
    this.add(ball);
  }

}

export { Pitch };