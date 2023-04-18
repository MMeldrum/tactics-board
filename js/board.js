import { DraggablePolygon } from "./model/DraggablePolygon.js";
import { Ball } from "./model/Ball.js"
import { Marker } from "./model/Marker.js"
import { Team } from "./model/Team.js"

const red = 0xff0000;
const blue = 0x0000ff;

var config = {
  type: Phaser.AUTO,
  parent: 'board',
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
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

var game = new Phaser.Game(config);

function preload()
{
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

  // buildMenu(this);

  // const oval = this.add.sprite(700, 20, 'oval').setInteractive().on('pointerup', (pointer, target) => {
  //   new DraggablePolygon(this, 400, 300, 4, 100, 0xff0000, 0.5);
  // });
  
  // var r1 = this.add.ellipse(450, 450, 400, 120, 0x6666ff);
  // r1.setAlpha(0.5);


  
  let ball = new Ball(this);
  let redTeam = new Team(this, 'red', 11);
  let blueTeam = new Team(this, 'blue', 11);

}

// function buildMenu(scene){
//   const settings = this.add.image(780, 20, 'settings').setInteractive();;
//   const rectangle = scene.add.image(740, 22, 'rectangle').setInteractive().on('pointerup', (pointer, target) => {
//     new DraggablePolygon(this, 400, 300, 4, 100, 0xff0000, 0.5);
//   });
// }
