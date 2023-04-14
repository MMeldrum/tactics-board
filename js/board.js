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

const defaultBallLocation = {'x': 400, 'y': 300};

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

    this.load.image('ball', 'img/ball.png');

    this.load.image('red', 'img/red.png');
    this.load.image('blue', 'img/blue.png');
    
    this.load.image('triangle', 'img/triangle.png');
    this.load.image('line', 'img/line.png');
}

function create()
{
    this.add.image(400, 300, 'bg');

    const settings = this.add.image(780, 20, 'settings');
    settings.setScale(0.05);
    
    const ballLocation = loadLocalStorageBall() || defaultBallLocation;
    addBall(this, ballLocation.x, ballLocation.y);

    // const markerLocations = loadLocalStorageMarkers() || defaultMarkerLocations;
    // console.log(`markerLocations: ${JSON.stringify(markerLocations)}`)
    addTeam(this, 'red', 10, 30);
    addTeam(this, 'blue', 450, 30);

}

function addTeam(scene, colour, xOffset, yOffset) {
    const startX = 20+xOffset;
    const startY = 20+yOffset;
    for (let i = 0; i < 11; i++) {
      addMarker(scene, i, startX+(i*30), startY, colour);
    }

}

function addBall(scene, x, y) {
    var sprite = scene.add.sprite(x, y, 'ball');
    sprite.setInteractive();
    scene.input.setDraggable(sprite);
    sprite.on('drag', (pointer, dragX, dragY) => {
      sprite.setPosition(dragX, dragY);
      localStorage.setItem('ballLocation', JSON.stringify({'x': dragX, 'y': dragY}));
    });
    sprite.setScale(0.2);
}

function addMarker(scene, id, x, y, colour) {
  const location = localStorage.getItem(`marker${colour}${id}Location`);
  if (location){
    x = JSON.parse(location).x;
    y = JSON.parse(location).y;
  }
  var sprite = scene.add.sprite(x, y, colour).setInteractive();
  sprite.setInteractive();
  scene.input.setDraggable(sprite);
  sprite.setData('id', id);
  sprite.setData('colour', colour);
  sprite.on('drag', (pointer, dragX, dragY) => {
      sprite.setPosition(dragX, dragY);
      const id = sprite.getData('id');
      const colour = sprite.getData('colour');
      localStorage.setItem(`marker${colour}${id}Location`, JSON.stringify({'colour': colour, 'x': dragX, 'y': dragY}));
    });

  sprite.setScale(0.2);
  return sprite;
}

function addRectangle(scene, x, y, colour){
  var polygon = new Phaser.Geom.Polygon([
    400, 100,
    200, 278,
    340, 430,
    650, 80
]);
}

function loadLocalStorageBall(){
  const ballLocation = localStorage.getItem('ballLocation');
  return JSON.parse(ballLocation);
}
