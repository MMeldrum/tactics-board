class DraggableCorner extends Phaser.GameObjects.Rectangle {
  constructor(scene, parent, x, y, size, fillColor) {
    super(scene, x, y, size, size, fillColor);
    scene.add.existing(this);
    this.parent = parent;
    this.setOrigin(0.5);
    this.setInteractive();
    this.input.draggable = true;
    this.on('drag', this.onDrag, this);
  }

  onDrag(pointer, dragX, dragY) {
    this.x = dragX;
    this.y = dragY;
    this.parent.updatePolygon();
  }
}

export { DraggableCorner };