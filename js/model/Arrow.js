class Arrow extends Phaser.GameObjects.Image {
    constructor (scene, x, y, toX, toY)
    {
        super(scene, x, y, 'arrow');
        scene.add.existing(this);
        this.setInitialPosition(scene);
        this.setInteractive();
        this.setScale(0.2);
        this.angle = 90;
        scene.input.setDraggable(this);

        var point0 = scene.add.rectangle(this.x+20, this.y, 10, 10, 0x00ff00);
        var point1 = scene.add.rectangle(this.x-20, this.y, 10, 10, 0x00ff00);

        // point0.setData('vector', this.curve.p0);
        // point1.setData('vector', this.curve.p1);

        point0.setInteractive();
        point1.setInteractive();
        scene.input.setDraggable(point0);
        scene.input.setDraggable(point1);

        point0.on('drag', (pointer, dragX, dragY) => {
          point0.setPosition(dragX, dragY);
        });

        point1.on('drag', (pointer, dragX, dragY) => {
          point1.setPosition(dragX, dragY);
        });


        this.on('drag', (pointer, dragX, dragY) => {
            // this.onDrag(pointer, dragX, dragY);
            this.setPosition(dragX, dragY);
            point0.setPosition(dragX-(this.displayWidth), dragY);
            point1.setPosition(dragX+(this.displayWidth), dragY);
        });

    }

    preUpdate (time, delta) {
    }

    onDrag(pointer, dragX, dragY){
      this.setPosition(dragX, dragY);
      // localStorage.setItem('arrowLocation', JSON.stringify({'x': dragX, 'y': dragY}));
  }

  setInitialPosition(scene){
    // const ballLocation = JSON.parse(localStorage.getItem('ballLocation'));
    // if (ballLocation){
    //   this.setPosition(ballLocation.x, ballLocation.y);
    // } else {
    //   this.setPosition(400, 300);
    // }
  }
}

export { Arrow };