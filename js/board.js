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

function preload ()
{
    this.load.image('bg', 'img/board.png');
    this.load.image('ball', 'img/ball.png');
    this.load.image('red', 'img/red.png');
    this.load.image('blue', 'img/blue.png');
}

function create ()
{
    this.add.image(400, 300, 'bg');
    
    addBall(this, 400, 300);

    addMarker(this, 20, 20, 'red');
    addMarker(this, 50, 20, 'red');
    addMarker(this, 80, 20, 'red');
    addMarker(this, 110, 20, 'red');
    addMarker(this, 140, 20, 'red');
    addMarker(this, 170, 20, 'blue');
    addMarker(this, 200, 20, 'blue');
    addMarker(this, 230, 20, 'blue');
    addMarker(this, 260, 20, 'blue');
    addMarker(this, 290, 20, 'blue');
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
