const red = 0xff0000;
const blue = 0x0000ff;

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload()
{
    this.load.image('bg', 'img/board.png');
    this.load.image('ball', 'img/ball.png');
    this.load.image('red', 'img/red.png');
    this.load.image('blue', 'img/blue.png');
}

function create()
{
    this.add.image(400, 300, 'bg');
    
    addBall(this, 400, 300);

    addTeam(this, 'red', 0);
    addTeam(this, 'blue', 400);

}

function addTeam(scene, colour, offset) {
    const startX = 20+offset;
    for (let i = 0; i < 11; i++) {
      addMarker(scene, startX+(i*30), 20, colour);
    }

}

function addBall(scene, x, y) {
    var ball = scene.add.sprite(x, y, 'ball').setInteractive();
    scene.input.setDraggable(ball);
    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    ball.setScale(0.2);

}

function addMarker(scene, x, y, colour) {
  var marker = scene.add.sprite(x, y, colour).setInteractive();
  scene.input.setDraggable(marker);
  scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

  marker.setScale(0.2);
  return marker;
}
