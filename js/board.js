import { ClickManager } from "./events/clickManager.js";
import { DraggablePolygon } from "./model/DraggablePolygon.js";
import { DraggableCorner } from "./model/DraggableCorner.js";
import { Ball } from "./model/Ball.js"
import { Team } from "./model/Team.js"
import { Line } from "./model/Line.js"
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


const defaultMarkerLocations = {
  'red': [
    {id: 1, 'x': 30, 'y': 50},
    {id: 2, 'x': 60, 'y': 50},
    {id: 3, 'x': 90, 'y': 50},
    {id: 4, 'x': 120, 'y': 50},
    {id: 5, 'x': 150, 'y': 50},
    {id: 6, 'x': 180, 'y': 50},
    {id: 7, 'x': 210, 'y': 50},
    {id: 8, 'x': 240, 'y': 50},
    {id: 9, 'x': 270, 'y': 50},
    {id: 10, 'x': 300, 'y': 50},
    {id: 11, 'x': 330, 'y': 50},
  ],
  'blue': [
    {id: 1, 'x': 470, 'y': 50},
    {id: 2, 'x': 500, 'y': 50},
    {id: 3, 'x': 530, 'y': 50},
    {id: 4, 'x': 560, 'y': 50},
    {id: 5, 'x': 590, 'y': 50},
    {id: 6, 'x': 620, 'y': 50},
    {id: 7, 'x': 650, 'y': 50},
    {id: 8, 'x': 680, 'y': 50},
    {id: 9, 'x': 710, 'y': 50},
    {id: 10, 'x': 740, 'y': 50},
    {id: 11, 'x': 770, 'y': 50},
  ]
}

const game = new Phaser.Game(config);

function preload()
{
  this.load.html('tactics-red', 'tactics-red.html');
  this.load.html('tactics-blue', 'tactics-blue.html');

  this.load.image('bg', 'img/pitch.png');
  this.load.image('settings', 'img/settings.png');
  this.load.image('delete', 'img/delete.png');
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

  const text = this.make.text({
    x: this.sys.game.scale.gameSize.width-55,
    y: 10,
    text: 'Tactics Board v0.0.4',
    origin: 0.5,
    style: {
        font: 'bold 10px Arial',
        fill: 'black'
    }
  });
  
  this.game.scale.on('orientationchange', (e) => {
    // console.log(e);
    // this.registry.destroy(); // destroy registry
    // this.events.off(); // disable all active events
    // this.scene.restart(); // restart current scene
    // switch(e) {
    //     case 'portrait-primary':
    //         this.game.scale.displaySize.aspectRatio = GAME_HEIGHT/GAME_WIDTH;
    //         this.game.scale.setGameSize(GAME_HEIGHT,GAME_WIDTH);
    //         break;
    //     case 'landscape-primary':
    //         this.game.scale.displaySize.aspectRatio = GAME_WIDTH/GAME_HEIGHT;
    //         this.game.scale.setGameSize(GAME_WIDTH,GAME_HEIGHT);
    //         break;
    //     default:  
    // }
  });

  // TODO move pitch setup to new class
  // const pitch = new Pitch(this, 100, 200);

  const middleX = this.sys.game.scale.gameSize.width/2;
  const middleY = this.sys.game.scale.gameSize.height/2;
  const bg = this.add.image(middleX, middleY, 'bg');

  const rt = this.add.renderTexture(0, 0, middleX*2, middleY*2);
  const brush = this.textures.getFrame('brush');

  bg.setInteractive().on('pointermove', (pointer, x, y) => {
    const currentlyOver = this.data.get('currentObject');
    // console.log(`currentlyOver: ${currentlyOver}`);
    if (currentlyOver == 'board'){

      // console.log(pointer, currentlyOver);
      const points = pointer.getInterpolatedPosition(30);
      // console.log(points);
      points.forEach(p => {
        // console.log('draw!')
        rt.draw(brush, p.x-5, p.y-5, 0.5);
      });
    }
  }, this);

  this.input.on('pointerdown', (pointer, currentlyOver) => {
    // console.log('pointerdown');
    // if (currentlyOver[0].type == 'Image'){
    if (currentlyOver[0].texture && currentlyOver[0].texture.key === 'bg'){
      // console.log(`currentlyOver: ${typeof currentlyOver}`);
      this.data.set('currentObject', 'board');
      rt.draw(brush, pointer.x, pointer.y, 1);
    }
  }, this);

  this.input.on('pointerup', (pointer, currentlyOver) => {
    // console.log('pointerup');
    this.data.set('currentObject', '');
  }, this);


  // Maximise bg size
  const xRatio = window.innerWidth / bg.width;
  const yRatio = window.innerHeight / bg.height;

  const bgScale = xRatio > yRatio ? yRatio : xRatio;
  bg.setScale(bgScale);
  // console.log(`bg actual width: ${bg.width*bgScale}, bg actual height: ${bg.height*bgScale}`)

  setupTacticsDropdown(this, 'red', 75, 25);
  setupTacticsDropdown(this, 'blue', 200, 25);

  buildMenu(this);
  
  let ball = new Ball(this);
  let redTeam = new Team(this, 'red', 11);
  let blueTeam = new Team(this, 'blue', 11);

  this.data.set('redTeam', redTeam);
  this.data.set('blueTeam', blueTeam);
  this.data.set('lines', []);
  this.data.set('areas', []);
  this.data.set('deletemode', false);

  this.input.on('pointerdown', (pointer, currentlyOver) => {  
    const deletionCandidate = currentlyOver[0];
    if (this.data.get('deletemode')){ 
      if (deletionCandidate instanceof Phaser.GameObjects.Image ||
        deletionCandidate instanceof Phaser.GameObjects.Sprite ||
        deletionCandidate instanceof Phaser.GameObjects.Rectangle) {
        console.log(`deletionCandidate: ${deletionCandidate}`);
        if (deletionCandidate instanceof Phaser.GameObjects.Sprite) {
          const line = deletionCandidate.data.get('line');
          const siblings = line.data.getAll();
          siblings.point0.destroy();
          siblings.point1.destroy();
          deletionCandidate.destroy();
        }
        if (deletionCandidate instanceof Phaser.GameObjects.Rectangle) {
          // could be rectangle or line
          const parent = deletionCandidate.parent;
          if (parent instanceof DraggablePolygon) {
            const siblings = parent.corners;
            console.log(siblings.length)
            for(let i = 0; i < 4; i++) {
              siblings[i].destroy();
            }
            parent.destroy();
          } else {
            const list = deletionCandidate.data.getAll();
            const line = list['line'].data.getAll();
            line['sprite'].destroy();
            line['point0'].destroy();
            line['point1'].destroy();
          }
          deletionCandidate.destroy();
        }
      }
      this.scene.systems.data.set('deletemode', false);
      console.log(this.scene.systems.data.get('deletemode'));
    } else {
      // if (deletionCandidate === undefined) {
      //   console.log('else mofo')
      //   rt.draw(brush, pointer.x, pointer.y, 1);
      // }
    }
  });

}

function buildMenu(scene){
  const arrow = scene.add.image(660, 20, 'arrow').setScale(0.1).setAngle(90).setInteractive().on('pointerup', (pointer, target) => {
    console.log(pointer, target)
    const line = new Line(scene, 550, 100);
    scene.data.get('lines').push(line);
  });
  arrow.setData('menuItem', 'arrow');
  const rectangle = scene.add.image(700, 22, 'rectangle').setInteractive().on('pointerup', (pointer, target) => {
    const poly = new DraggablePolygon(scene, 400, 300, 4, 100, 0xffff00, 0.5);
    scene.data.get('areas').push(poly);
  });
  rectangle.setData('menuItem', 'rectangle');
  const del = scene.add.image(740, 20, 'delete').setScale(0.5).setInteractive().on('pointerup', (pointer, target) => {
    scene.data.set('deletemode', true);
    console.log(scene.data.get('deletemode'));
    game.canvas.style.cursor = "pointer";
  });
  del.setData('menuItem', 'delete');
  const settings = scene.add.image(780, 20, 'settings').setInteractive();
  settings.setData('menuItem', 'settings');
}

function setupTacticsDropdown(scene, colour, x, y){
  let dropdown = scene.add.dom(x,y).createFromCache(`tactics-${colour}`);
  let ratioX = game.config.width / window.innerWidth
  let ratioY = game.config.height / window.innerHeight
  dropdown.setScale(Math.max(ratioX, ratioY));dropdown.addListener('click');
  dropdown.on('click', function(e) {
    // different actions to do according to element 'id' property
    const team = scene.data.get(`${colour}Team`);
    team.setFormation(e.target.id);
  }, this);

}