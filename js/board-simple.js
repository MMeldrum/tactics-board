import { ClickManager } from "./events/clickManager.js";
import { Pitch } from "./model/Pitch.js"

const red = 0xff0000;
const blue = 0x0000ff;

var config = {
  type: Phaser.AUTO,
  parent: 'board',
  width: window.innerWidth,
  height: window.innerHeight,
  // backgroundColor: 0xbbffbb,
  backgroundColor: 0xffffff,
  dom: {
    createContainer: true
  },
  scene: {
    preload: preload,
    create: create
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};


const game = new Phaser.Game(config);

function preload()
{
  this.load.html('tactics-red', 'tactics-red.html');
  this.load.html('tactics-blue', 'tactics-blue.html');

  this.load.image('bg', 'img/pitch.png');
  this.load.image('settings', 'img/settings.png');
  this.load.image('delete', 'img/delete.png');
  this.load.image('undo', 'img/undo.png');
  this.load.image('rectangle', 'img/rectangle.png');
  this.load.image('arrow', 'img/arrow.png');

  this.load.image('ball', 'img/ball.png');

  this.load.image('red', 'img/red.png');
  this.load.image('blue', 'img/blue.png');
  
  this.load.image('triangle', 'img/triangle.png');
  this.load.image('line', 'img/line.png');

  this.load.image('brush', 'img/paint8x.png');

  // console.log(this.sys.game.scale.gameSize.width, this.sys.game.scale.gameSize.height)
}

function create(){

  this.data.set('currentObject', '');
  this.data.set('history', []);

  // TODO move pitch setup to new class
  // const pitch = new Pitch(this, 100, 200);

  const middleX = this.sys.game.scale.gameSize.width/2;
  const middleY = this.sys.game.scale.gameSize.height/2;
  const bg = this.add.image(0, 0, 'bg');

  const brush = this.textures.getFrame('brush');
  
  bg.setInteractive().on('pointermove', (pointer, x, y) => {
    const rt = this.add.renderTexture(0, 0, middleX*2, middleY*2);
    
    // const currentlyOver = this.data.get('currentObject');
    // if (currentlyOver == 'board'){
      const points = pointer.getInterpolatedPosition(30);
      points.forEach(p => {
        rt.draw(brush, p.x-5, p.y-5, 0.5);
      });
    // }
    // this.data.get('history').push(rt);
  }, this);
  
  this.input.on('pointerdown', (pointer, currentlyOver) => {
    const rt = this.add.renderTexture(0, 0, middleX*2, middleY*2);
    if (currentlyOver[0].texture && currentlyOver[0].texture.key === 'bg'){
      this.data.set('currentObject', 'board');
      // rt.draw(brush, pointer.x, pointer.y, 1);
    }
  }, this);

}