import { Marker } from "./Marker.js"

class Team {

  constructor (scene, colour, playerCount) {
    this.players = [];
    this.colour = colour;
    this.leftToRight = colour === 'red';

    console.log(`Creating ${playerCount} ${colour} players, LTR is ${this.leftToRight}`)
    for (let index = 0; index < playerCount; index++) {
      const player = new Marker(scene, colour, 100, 100, index);
      this.players[index] = player;
    }

  }

  setFormation(formation){
    // console.log(formation);
    const GK_X = this.leftToRight ? 50 : 750;
    const DEF_X = this.leftToRight ? 180 : 620;
    const MID_X = this.leftToRight ? 380 : 420;
    const ATT_X = this.leftToRight ? 600 : 200;
    const PUSH_FWD = this.leftToRight ? 25 : -25;
    const PULL_BCK = this.leftToRight ? -25 : 25;
    switch (formation) {
      case '4-4-2':
        this.setTeamFormation({players:[
          {'x': GK_X,           'y': 300},

          {'x': DEF_X+PUSH_FWD, 'y': 150},
          {'x': DEF_X,          'y': 250},
          {'x': DEF_X,          'y': 350},
          {'x': DEF_X+PUSH_FWD, 'y': 450},
          
          {'x': MID_X,          'y': 150},
          {'x': MID_X,          'y': 250},
          {'x': MID_X,          'y': 350},
          {'x': MID_X,          'y': 450},
          
          {'x': ATT_X,          'y': 250},
          {'x': ATT_X,          'y': 350},
        ]
        });
        break;
      case '4-3-3':
        this.setTeamFormation({players:[
          {'x': GK_X,                     'y': 300},

          {'x': DEF_X+PUSH_FWD,           'y': 150},
          {'x': DEF_X,                    'y': 250},
          {'x': DEF_X,                    'y': 350},
          {'x': DEF_X+PUSH_FWD,           'y': 450},

          {'x': MID_X+PUSH_FWD,           'y': 175},
          {'x': MID_X+PULL_BCK,           'y': 300},
          {'x': MID_X+PUSH_FWD,           'y': 425},
          
          {'x': ATT_X+PULL_BCK+PULL_BCK,  'y': 150},
          {'x': ATT_X+PUSH_FWD,           'y': 300},
          {'x': ATT_X+PULL_BCK+PULL_BCK,  'y': 450},
        ]
        });
        break;
      case '4-5-1':
        this.setTeamFormation({players:[
          {'x': GK_X,                               'y': 300},

          {'x': DEF_X+PUSH_FWD,                     'y': 150},
          {'x': DEF_X,                              'y': 250},
          {'x': DEF_X,                              'y': 350},
          {'x': DEF_X+PUSH_FWD,                     'y': 450},

          {'x': MID_X+(PUSH_FWD+PUSH_FWD+PUSH_FWD), 'y': 100},
          {'x': MID_X+PULL_BCK,                     'y': 200},
          {'x': MID_X+(PULL_BCK+PULL_BCK),          'y': 300},
          {'x': MID_X+PULL_BCK,                     'y': 400},
          {'x': MID_X+(PUSH_FWD+PUSH_FWD+PUSH_FWD), 'y': 500},

          {'x': ATT_X,                              'y': 300},
        ]
        });
        break;
        break;
      case '4-2-3-1':
        this.setTeamFormation({players:[
          {'x': GK_X,     'y': 300},

          {'x': DEF_X+PUSH_FWD,                     'y': 150},
          {'x': DEF_X,                              'y': 250},
          {'x': DEF_X,                              'y': 350},
          {'x': DEF_X+PUSH_FWD,                     'y': 450},
          
          {'x': MID_X+(PUSH_FWD+PUSH_FWD),          'y': 100},
          {'x': MID_X+(PULL_BCK+PULL_BCK+PULL_BCK), 'y': 225},
          {'x': MID_X+(PUSH_FWD+PUSH_FWD+PUSH_FWD), 'y': 300},
          {'x': MID_X+(PULL_BCK+PULL_BCK+PULL_BCK), 'y': 375},
          {'x': MID_X+(PUSH_FWD+PUSH_FWD),          'y': 500},
          
          {'x': ATT_X,                              'y': 300},
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