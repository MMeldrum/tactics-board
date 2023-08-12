import { Marker } from "./Marker.js"

class Team {

  scene;

  constructor (scene, colour, playerCount) {
    this.scene = scene;
    this.players = [];
    this.colour = colour;
    this.leftToRight = colour === 'red';

    const { width, height } = scene.sys.game.canvas;

    // console.log(`Creating ${playerCount} ${colour} players, LTR is ${this.leftToRight}`)
    for (let index = 0; index < playerCount; index++) {
      const player = new Marker(scene, colour, 100, 100, index);
      this.players[index] = player;
    }
    const bg = scene.children.list[0];
    // console.log('bg', bg);
    
    // temp while adjusting formations
    this.setFormation('4-5-1');

  }

  calculatePosition(xPercent, yPercent) {
    const { width, height } = this.scene.sys.game.scale.gameSize;
    const xOffset = width * xPercent/100;
    const yOffset = height * yPercent/100;
    return { x: this.leftToRight ? xOffset : width - xOffset, y: yOffset};
  }


  setFormation(formation){
    // console.log(formation);
    
    // console.log(this.calculatePosition(5, 50));
    const GK = this.calculatePosition(5, 50);
    const DEF_X = this.leftToRight ? 180 : 620;
    const MID_X = this.leftToRight ? 380 : 420;
    const ATT_X = this.leftToRight ? 600 : 200;
    const PUSH_FWD = this.leftToRight ? 25 : -25;
    const PULL_BCK = this.leftToRight ? -25 : 25;
    switch (formation) {
      case '4-4-2':
        this.setTeamFormation({players:[
          GK,
          this.calculatePosition(20+5, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+5, 80),

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

          this.calculatePosition(20+5, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+5, 80),

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

          this.calculatePosition(20+5, 20),
          this.calculatePosition(20, 40),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+5, 80),

          this.calculatePosition(50+10, 15),
          this.calculatePosition(50-2, 30),
          this.calculatePosition(50-2, 50),
          this.calculatePosition(50-2, 70),
          this.calculatePosition(50+10, 85),

          this.calculatePosition(70, 50),

        ]
        });
        break;
        break;
      case '4-2-3-1':
        this.setTeamFormation({players:[
          GK,

          this.calculatePosition(20+5, 20),
          this.calculatePosition(20, 37.5),
          this.calculatePosition(20, 60),
          this.calculatePosition(20+5, 80),

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