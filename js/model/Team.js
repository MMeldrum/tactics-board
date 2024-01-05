import { Marker } from "./Marker.js"

class Team {

  scene;
  scale;

  constructor (scene, colour, playerCount) {
    this.scene = scene;
    this.players = [];
    this.colour = colour;
    this.leftToRight = colour === 'red';

    const { width, height } = scene.sys.game.canvas;

    // console.log(`Creating ${playerCount} ${colour} players, LTR is ${this.leftToRight}`)
    for (let index = 0; index < playerCount; index++) {
      const player = new Marker(scene, colour, 10+(index*10), 100, index);
      this.players[index] = player;
    }
    const bg = scene.children.list[1];

    // console.log(`screen width / 2: ${bg.displayWidth / 2}`)
    // console.log(`display width / 2: ${width / 2}`)
    // this.scale = (width / 2) - (bg.displayWidth / 2);
    // this.scale = bg.displayWidth / width;
    // console.log(`left offset: ${this.scale}`)
    
    // temp while adjusting formations
    this.setFormation('4-5-1');

  }

  calculatePosition(xPercent, yPercent) {
    const bg = this.scene.children.list[1];
    const offsetX = (window.innerWidth - bg.displayWidth) / 2;
    const offsetY = (window.innerHeight - bg.displayHeight) / 2;
    const playerX = this.leftToRight ? ((xPercent * bg.displayWidth) / 100) + offsetX : (bg.displayWidth - (xPercent / 100 * bg.displayWidth)) + offsetX;
    const playerY = ((yPercent / 100) * bg.displayHeight) + offsetY;
    return { x: playerX, y: playerY};
  }


  setFormation(formation){
    // console.log(formation);
    
    const GK = this.calculatePosition(5, 50);
    const DEF_X = this.leftToRight ? 180 : 620;
    const MID_X = this.leftToRight ? 380 : 420;
    const ATT_X = this.leftToRight ? 600 : 200;
    const PUSH_FWD = 5;
    const PULL_BCK = -5;
    switch (formation) {
      case '4-4-2':
        this.setTeamFormation({players:[
          GK,

          this.calculatePosition(20+PUSH_FWD, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+PUSH_FWD, 80),

          this.calculatePosition(40, 20),
          this.calculatePosition(40, 40),
          this.calculatePosition(40, 60),
          this.calculatePosition(40, 80),

          this.calculatePosition(70, 40),
          this.calculatePosition(70, 60),
        ]
        });
        break;
      case '4-3-3':
        this.setTeamFormation({players:[
          GK,

          this.calculatePosition(20+PUSH_FWD, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+PUSH_FWD, 80),

          this.calculatePosition(40, 30),
          this.calculatePosition(40, 50),
          this.calculatePosition(40, 70),

          this.calculatePosition(70, 30),
          this.calculatePosition(70, 50),
          this.calculatePosition(70, 70),
        ]
        });
        break;
      case '4-5-1':
        this.setTeamFormation({players:[
          GK,

          this.calculatePosition(20+PUSH_FWD, 20),
          this.calculatePosition(20, 40),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+PUSH_FWD, 80),

          this.calculatePosition(50+PUSH_FWD+PUSH_FWD, 15),
          this.calculatePosition(50-PULL_BCK, 30),
          this.calculatePosition(50-PULL_BCK, 50),
          this.calculatePosition(50-PULL_BCK, 70),
          this.calculatePosition(50+PUSH_FWD+PUSH_FWD, 85),

          this.calculatePosition(70, 50),

        ]
        });
        break;
        break;
      case '4-2-3-1':
        this.setTeamFormation({players:[
          GK,

          this.calculatePosition(20+PUSH_FWD, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+PUSH_FWD, 80),

          this.calculatePosition(40, 30),
          this.calculatePosition(40, 50),
          this.calculatePosition(40, 70),

          this.calculatePosition(70, 30),
          this.calculatePosition(70, 50),
          this.calculatePosition(70, 70),
        ]
        });
        break;
      default:
        console.log(`Formation ${formation} not found.`)
        break;
    }
  }

  setTeamFormation(formation) {
    for (let index = 0; index < this.players.length; index++) {
      this.players[index].setPosition(formation.players[index].x, formation.players[index].y);
    }   
  }
}

export { Team };