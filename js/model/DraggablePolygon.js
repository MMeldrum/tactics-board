import { DraggableCorner } from './DraggableCorner.js';

class DraggablePolygon extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, sides, size, fillColor, alpha) {
    super(scene);
    scene.add.existing(this);
    this.x = x;
    this.y = y;
    this.setInteractive();
    this.fillColor = fillColor;
    this.alpha = alpha;
    this.cornerSize = 10;
    this.cornerColor = 0xff7777;
    this.cornerAlpha = 1;
    this.on('drag', this.onDrag, this);
    this.points = this.generatePoints(sides, size);
    this.drawPolygon();
    this.drawCorners();
  }

  generatePoints(sides, size) {
    let points = [];
    for (let i = 0; i < sides; i++) {
      let angle = (i / sides) * 2 * Math.PI;
      let x = size * Math.cos(angle);
      let y = size * Math.sin(angle);
      points.push({ x, y });
    }
    return points;
  }

  onDrag(pointer, dragX, dragY) {
    console.log('ondrag');
    // this.x = dragX;
    // this.y = dragY;
    // this.parent.updatePolygon();
  }

  drawPolygon() {
    this.clear();
    this.fillStyle(this.fillColor, this.alpha);
    this.beginPath();
    this.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.lineTo(this.points[i].x, this.points[i].y);
    }
    this.closePath();
    this.fillPath();
  }

  drawCorners() {
    this.corners = [];
    for (let i = 0; i < this.points.length; i++) {
      let corner = new DraggableCorner(
        this.scene,
        this,
        this.x + this.points[i].x,
        this.y + this.points[i].y,
        this.cornerSize,
        this.cornerColor
      );
      this.corners.push(corner);
    }
  }

  updatePolygon() {
    for (let i = 0; i < this.points.length; i++) {
      let corner = this.corners[i];
      this.points[i].x = corner.x - this.x;
      this.points[i].y = corner.y - this.y;
    }
    this.drawPolygon();
  }
}

export { DraggablePolygon };