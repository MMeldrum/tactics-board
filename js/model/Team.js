import { Marker } from "./Marker.js"

class Team {

  constructor (scene, colour, playerCount) {
    this.players = [];
    this.colour = colour;

    console.log(`Creating ${playerCount} ${colour} players`)
    for (let index = 0; index < playerCount; index++) {
      const player = new Marker(scene, colour, 100, 100, index);
      this.players[index] = player;
    }

  }

}

export { Team };