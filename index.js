import {
  shuffleDeck,
  generateDeck,
  drawSets
} from './cardUtilities.js';
import {
  playGame
} from './gameLogic.js';
import { state } from './sharedState.js';

do {
  
  // Embaralhe o deck e distribua para os jogadores
  state.deck = shuffleDeck(generateDeck());
  state.sets = drawSets(state.deck, 4, 3);

  console.log(state.sets);

  playGame();
  
  console.log("Resultado parcial");
  console.log("Time 1: ", state.scoreT1);
  console.log("Time 2: ", state.scoreT2);
  
} while (state.scoreT1 < 12 && state.scoreT2 < 12 );

if(state.scoreT1 > state.scoreT2) {
  console.log("O jogo terminou time 1 venceu!");
}else{
  console.log("O jogo terminou time 2 venceu!");
}

console.log("\n================================\n")

console.log("Resultado final");
console.log("Time 1: ", state.scoreT1);
console.log("Time 2: ", state.scoreT2);

console.log("\n================================\n")

