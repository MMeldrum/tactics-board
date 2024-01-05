class Line extends Phaser.GameObjects.Image {

  constructor(scene, x, y, colour) {
    super(scene, x, y, colour);

    const pointSize = 15;
    var sprite = scene.add.sprite(x, y, 'arrow').setName('arrow');
    sprite.angle = 90;
    // sprite.setOrigin(0.5);
    sprite.displayWidth = 10;
    // var point0 = scene.add.rectangle(sprite.x, sprite.y-(sprite.displayHeight/2), pointSize, pointSize, 0xbbffbb).setName('point0');
    // var point1 = scene.add.rectangle(sprite.x, sprite.y+(sprite.displayHeight/2), pointSize, pointSize, 0xbbffbb).setName('point1');
    var point0 = scene.add.rectangle(sprite.x+(sprite.displayHeight/2), sprite.y, pointSize, pointSize, 0xbbffbb).setName('point0');
    var point1 = scene.add.rectangle(sprite.x-(sprite.displayHeight/2), sprite.y, pointSize, pointSize, 0xbbffbb).setName('point1');
    
    point0.setData('line', this);
    point1.setData('line', this);
    sprite.setData('line', this);

    this.setData('point0', point0);
    this.setData('point1', point1);
    this.setData('sprite', sprite);

    // Enable input events on the sprite
    sprite.setInteractive({ draggable: true, resize: true, rotate: true });
    point0.setInteractive({ draggable: true });
    point1.setInteractive({ draggable: true });


    // Add a drag event listener
    this.setInteractive();
    scene.input.setDraggable(this);

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      // console.log(gameObject.name, gameObject.x, gameObject.y);
      if (gameObject.name.startsWith('point')){
        gameObject.x = dragX;
        gameObject.y = dragY;
        const line = gameObject.data.get('line');
        line.drawArrow(gameObject, dragX, dragY);
      }
    });

  }

  drawArrow(gameObject, dragX, dragY){
    // console.log(gameObject.name, dragX, dragY);

    this.data.get('sprite').destroy;
    const p0 = this.data.get('point0');
    const p1 = this.data.get('point1');
    var distance = Phaser.Math.Distance.BetweenPoints(p0, p1);
    var angle = Phaser.Math.Angle.BetweenPoints(p0, p1);
    // console.log(distance, angle)
    var sprite = this.data.get('sprite');
    // var sprite = p0.scene.add.sprite(p0.x, p0.y, 'arrow');
    // sprite.setName('arrow');
    sprite.setRotation(angle-1.5708);
    // sprite.setRotation(angle);
    sprite.x = p0.x;
    sprite.y = p0.y;
    sprite.displayHeight = distance;
    sprite.displayWidth = 10;
    sprite.setOrigin(0, 0);
  }

}

export { Line };