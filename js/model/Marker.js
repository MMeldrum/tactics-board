class Marker extends Phaser.GameObjects.Image {

  constructor (scene, colour, x, y, number) {

    super(scene, x, y, colour);
    const storedLocation = this.loadFromStorage(colour, number) ;
    if (storedLocation) {
      this.x = storedLocation.x;
      this.y = storedLocation.y;
    } else {
      this.setPosition(x, y);
    }

    scene.add.existing(this);

    const bg = scene.children.list[1];
    const scaleFactor = 0.033;
    this.setScale((bg.displayWidth / 100) * scaleFactor);

    // console.log(`Creating ${colour} player ${number} at ${x},${y}`)

    this.colour = colour;
    this.number = number;

    this.setInteractive();
    scene.input.setDraggable(this);

    this.on('drag', (pointer, dragX, dragY, colour, number) => {
      // console.log(`Calling ${dragX} ${dragY} ${this.colour} ${this.number}`);
      this.onDrag(pointer, dragX, dragY, this.colour, this.number);
    });
    
    this.on('dragend', (pointer, dragX, dragY, colour, number) => {
      // console.log('drag end');
      // if (this.scene.data.get('currentObject') === 'MARKER') {
        this.scene.data.set('currentObject', 'board');
      // }
    });

  }

  setPosition(x, y){
    super.setPosition(x,y);
    const key = `marker${this.colour}${this.number}Location`;
    localStorage.setItem(key, JSON.stringify({'colour': this.colour,'x': x, 'y': y}));
  }

  onDrag(pointer, dragX, dragY, team, number) {
    // console.log(dragX, dragY, team, number);
    // console.log('drag start');
    this.scene.data.set('currentObject', 'MARKER');
    this.setPosition(dragX, dragY);
    const key = `marker${team}${number}Location`;
    localStorage.setItem(key, JSON.stringify({'colour': team,'x': dragX, 'y': dragY}));
  }

  loadFromStorage(colour, number) {
    const location = localStorage.getItem(`marker${colour}${number}Location`);
    // console.log(`From storage: ${JSON.stringify(location)}`);
    return JSON.parse(location);
  }
}

export { Marker };