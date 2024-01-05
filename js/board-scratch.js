const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
},
  scene: {
      preload: preload,
      create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('image', 'img/board.png'); 
}

function create() {

  const menuHeight = 30;

  const container = this.add.container(0, menuHeight);
  // console.log(window.innerWidth)
  container.width = window.innerWidth;
  container.height = window.innerHeight - menuHeight*2;

  // // add pitch image
  const image = this.add.image(0,0, 'image').setOrigin(0, 0);
  container.add(image);
    
  // // Add a temporary background to the container
  const graphics = this.add.graphics();
  graphics.fillStyle(0x666666);
  graphics.fillRect(0, 0, container.width, container.height);
  container.add(graphics);
  container.sendToBack(graphics);

  // // Scale the image to full canvas width, maintaining aspect ratio
  // const scaleWidth = container.width / image.width
  // const scaleHeight = container.height / image.height
  // image.setScale(scaleWidth > scaleHeight ? scaleHeight : scaleWidth)

  // // container.setSize(100, 100);

  // // Center the image on the canvas vertically
  // image.x = container.displayWidth / 2;
  // image.y = container.displayHeight / 2;
  // // image.x = 500;
  // // image.y = 50;
  
  // // Add markers in each corner
  const markerSize = 20; // Adjust the size of the markers as needed
  const markers = [
      // this.add.rectangle(0, 0, markerSize, markerSize, 0xFF0000), // Top-left
      this.add.ellipse(1, 1, markerSize, markerSize, 0xFF0000).setOrigin(0,0), // Top-left
      this.add.ellipse(20, 20, markerSize, markerSize, 0x00FF00), // Top-left
      this.add.ellipse(window.innerWidth/2, window.innerHeight/2, markerSize, markerSize, 0xFFFF00), // Top-left
      // this.add.ellipse(container.width/2, , markerSize, markerSize, 0x333333), // Top-left
      // this.add.ellipse(container.width-3, 2, markerSize, markerSize, 0xFFFFFF), // Top-left
      // this.add.ellipse(container.width-1, container.height, markerSize, markerSize, 0xFFFF00), // Top-left
      // this.add.ellipse(0, container.height, markerSize, markerSize, 0x0000FF), // Bottom-left
      // this.add.rectangle(container.displayWidth, 0, markerSize, markerSize, 0x0000FF), // Top-right
      // this.add.rectangle(container.displayWidth, container.displayHeight, markerSize, markerSize, 0xFFFF00), // Bottom-right
  ];

  // Center the markers in each corner
  markers.forEach(marker => {
      marker.setOrigin(0.5, 0.5);
      container.add(marker);
  });
}
