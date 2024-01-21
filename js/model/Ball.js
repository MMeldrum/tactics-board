class Ball extends Phaser.GameObjects.Image {
    constructor (scene, x, y)
    {
        super(scene, x, y, 'ball');
        scene.add.existing(this);

        const bg = scene.children.list[1];

        const scaleFactor = 0.033;
        this.setScale((bg.displayWidth / 100) * scaleFactor);
            
        this.setInitialPosition(scene);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.on('drag', (pointer, dragX, dragY) => {
            this.onDrag(pointer, dragX, dragY);
        });
  
        this.on('dragend', (pointer, dragX, dragY, colour, number) => {
          // console.log('drag end');
          if (this.scene.data.get('currentObject') === 'MARKER') {
            this.scene.data.set('currentObject', null);
          }
        });

    }

    preUpdate (time, delta) {
    }

    onDrag(pointer, dragX, dragY){
      this.setPosition(dragX, dragY);
      this.scene.data.set('currentObject', 'MARKER');
      localStorage.setItem('ballLocation', JSON.stringify({'x': dragX, 'y': dragY}));
  }

  setInitialPosition(scene){
    const ballLocation = JSON.parse(localStorage.getItem('ballLocation'));
    if (ballLocation){
      this.setPosition(ballLocation.x, ballLocation.y);
    } else {
      this.setPosition(400, 300);
    }
  }
}

export { Ball };