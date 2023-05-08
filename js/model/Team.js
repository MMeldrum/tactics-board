import { Marker } from "./Marker.js"

class Team {

  constructor (scene, colour, playerCount) {
    this.players = [];
    this.colour = colour;
    this.leftToRight = colour === 'red';

    console.log(`Creating ${playerCount} ${colour} players`)
    for (let index = 0; index < playerCount; index++) {
      const player = new Marker(scene, colour, 100, 100, index);
      this.players[index] = player;
    }

  }

  setFormation(formation){
    // console.log(formation);
    const GK_X = 50;
    const DEF_X = 180;
    const MID_X = 400;
    const ATT_X = 600;
    switch (formation) {
      case '4-4-2':
        this.setTeamFormation({players:[
          {'x': GK_X,     'y': 300},
          {'x': DEF_X+25, 'y': 150},
          {'x': DEF_X, 'y': 250},
          {'x': DEF_X, 'y': 350},
          {'x': DEF_X+25, 'y': 450},
          {'x': MID_X, 'y': 150},
          {'x': MID_X, 'y': 250},
          {'x': MID_X, 'y': 350},
          {'x': MID_X, 'y': 450},
          {'x': ATT_X, 'y': 250},
          {'x': ATT_X, 'y': 350},
        ]
        });
        break;
      case '4-3-3':
        this.setTeamFormation({players:[
          {'x': GK_X,     'y': 300},
          {'x': DEF_X+25, 'y': 150},
          {'x': DEF_X,    'y': 250},
          {'x': DEF_X,    'y': 350},
          {'x': DEF_X+25, 'y': 450},

          {'x': MID_X+25, 'y': 175},
          {'x': MID_X-50, 'y': 300},
          {'x': MID_X+25, 'y': 425},
          
          {'x': ATT_X-50, 'y': 150},
          {'x': ATT_X+25, 'y': 300},
          {'x': ATT_X-50, 'y': 450},
        ]
        });
        break;
      case '4-5-1':
        this.setTeamFormation({players:[
          {'x': GK_X,     'y': 300},
          {'x': DEF_X+25, 'y': 150},
          {'x': DEF_X, 'y': 250},
          {'x': DEF_X, 'y': 350},
          {'x': DEF_X+25, 'y': 450},
          {'x': MID_X+50, 'y': 100},
          {'x': MID_X-25, 'y': 200},
          {'x': MID_X-50, 'y': 300},
          {'x': MID_X-25, 'y': 400},
          {'x': MID_X+50, 'y': 500},
          {'x': ATT_X, 'y': 300},
        ]
        });
        break;
        break;
      case '4-2-3-1':
        this.setTeamFormation({players:[
          {'x': GK_X,     'y': 300},
          {'x': DEF_X+25, 'y': 150},
          {'x': DEF_X, 'y': 250},
          {'x': DEF_X, 'y': 350},
          {'x': DEF_X+25, 'y': 450},
          {'x': MID_X+25, 'y': 100},
          {'x': MID_X-50, 'y': 225},
          {'x': MID_X+25, 'y': 300},
          {'x': MID_X-50, 'y': 375},
          {'x': MID_X+25, 'y': 500},
          {'x': ATT_X, 'y': 300},
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