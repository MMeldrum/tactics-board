import { DraggableCorner } from './DraggableCorner.js';

class DraggablePolygon extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y, sides, size, fillColor, alpha) {
    super(scene);
    scene.add.existing(this);
    this.x = x;
    this.y = y;
    this.setInteractive();
    // scene.input.setDraggable(this);
    this.fillColor = fillColor;
    this.alpha = alpha;
    this.cornerSize = this.calculateCornerSize(scene);
    this.cornerColor = 0xff7777;
    this.cornerAlpha = 1;
    this.on('pointerdown', this.onClick, this);
    this.on('drag', this.onDrag, this);
    // this.on('drag', (pointer, dragX, dragY, colour, number) => {
    //   console.log('ondrag');
    //   this.data.set('currentObject', 'POLYGON');
      // });
    this.on('dragend', (pointer, dragX, dragY, colour, number) => {
      console.log('poly dragend');
      this.data.set('currentObject', null);
    });

    this.points = this.generatePoints(sides, size);
    this.drawPolygon();
    this.drawCorners();
  }

  calculateCornerSize(scene) {
    const width = scene.sys.game.scale.gameSize.width;
    console.log(width/80);
    return width/80;
  }

  generatePoints(sides, size) {
    console.log(sides, size);
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
    this.x = dragX;
    this.y = dragY;
    this.parent.updatePolygon();
  }

  onClick(pointer, dragX, dragY) {
    console.log('onclick');
    // if (game.canvas.style.cursor == "pointer") {
      console.log('DELETE!');
    // }
  }

  drawPolygon() {
    this.scene.data.set('currentObject', 'polygon');
    this.clear();
    this.fillStyle(this.fillColor, this.alpha);
    this.beginPath();
    this.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.lineTo(this.points[i].x, this.points[i].y);
    }
    this.closePath();
    this.fillPath();
    this.setInteractive(this, (x) => {
      // if(pointer.isDown) {
        // console.log('interaction');
      // }
    });
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