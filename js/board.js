import { DraggablePolygon } from "./model/DraggablePolygon.js";
import { Ball } from "./model/Ball.js"
import { Team } from "./model/Team.js"

const red = 0xff0000;
const blue = 0x0000ff;

var config = {
  type: Phaser.AUTO,
  parent: 'board',
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  dom: {
    createContainer: true
  },
  scene: {
    preload: preload,
    create: create
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

const options = [
  "Option 1",
  "Option 2",
  "Option 3",
];

var game = new Phaser.Game(config);

function preload()
{
  this.load.html('tactics-red', 'tactics-red.html');
  this.load.html('tactics-blue', 'tactics-blue.html');

  this.load.image('bg', 'img/board.png');
  this.load.image('settings', 'img/settings.png');
  this.load.image('rectangle', 'img/rectangle.png');
  // this.load.image('oval', 'img/oval.png');

  this.load.image('ball', 'img/ball.png');

  this.load.image('red', 'img/red.png');
  this.load.image('blue', 'img/blue.png');
  
  this.load.image('triangle', 'img/triangle.png');
  this.load.image('line', 'img/line.png');
}

function create()
{
  this.add.image(400, 300, 'bg');

  setupTacticsDropdown(this, 'red', 75, 25);
  setupTacticsDropdown(this, 'blue', 200, 25);

  buildMenu(this);

  // const oval = this.add.sprite(700, 20, 'oval').setInteractive().on('pointerup', (pointer, target) => {
  //   new DraggablePolygon(this, 400, 300, 4, 100, 0xff0000, 0.5);
  // });
  
  // var r1 = this.add.ellipse(450, 450, 400, 120, 0x6666ff);
  // r1.setAlpha(0.5);


  
  let ball = new Ball(this);
  let redTeam = new Team(this, 'red', 11);
  let blueTeam = new Team(this, 'blue', 11);

  this.data.set('redTeam', redTeam);
  this.data.set('blueTeam', blueTeam);
}

function buildMenu(scene){
  const settings = scene.add.image(780, 20, 'settings').setInteractive();;
  const rectangle = scene.add.image(740, 22, 'rectangle').setInteractive().on('pointerup', (pointer, target) => {
    new DraggablePolygon(scene, 400, 300, 4, 100, 0xff0000, 0.5);
  });
}

function setupTacticsDropdown(scene, colour, x, y){
  let dropdown = scene.add.dom(x,y).createFromCache(`tactics-${colour}`);
  let ratioX = game.config.width / window.innerWidth
  let ratioY = game.config.height / window.innerHeight
  dropdown.setScale(Math.max(ratioX, ratioY));dropdown.addListener('click');
  dropdown.on('click', function(e) {
    // different actions to do according to element 'id' property
    const team = scene.data.get('redTeam');
    switch(e.target.id) {
      case '4-4-2':
        team.setFormation('4-4-2');
        break;
      case '4-3-3':
        console.log('4-3-3')
        break;
      case '4-5-1':
        console.log('4-5-1')
        break;
      case '4-2-3-1':
        console.log('4-2-3-1')
        team.setFormation('4-2-3-1');
        break;
      case 'reset':
        console.log('reset')
        break;
    }
  }, this);

}