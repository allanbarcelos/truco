import { cardStrength } from './cardUtilities.js';
import {
    getHighestCard,
    getLowestCard,
    hasMultipleStrongCards,
    getSecondHighestCard,
    getHigherThanTable,
    canTieRound
} from './playerStrategy.js';
import { state } from './sharedState.js';

export function playRound(startingPlayer) {
    let tableCard = null;
    let winner = startingPlayer;
    let tie = false;

    for (let i = 0; i < 4; i++) {
        const currentPlayer = (startingPlayer + i) % 4;
        let playedCard;

        switch (currentPlayer) {
            case 0:
            case 2:
                if (currentPlayer === startingPlayer) {
                    if (hasMultipleStrongCards(state.sets[currentPlayer])) {
                        playedCard = getSecondHighestCard(state.sets[currentPlayer]);
                    } else if (state.sets[currentPlayer].includes('4♣')) {
                        playedCard = getSecondHighestCard(state.sets[currentPlayer]);
                    } else {
                        playedCard = getHighestCard(state.sets[currentPlayer]);
                    }
                } else {
                    playedCard = !tableCard || (tableCard && currentPlayer === 0) ? getHighestCard(state.sets[currentPlayer]) : getLowestCard(state.sets[currentPlayer]);
                }
                break;
            case 1:
            case 3:
                if (tableCard && !tie && currentPlayer !== winner && canTieRound(state.sets[currentPlayer], tableCard)) {
                    playedCard = tableCard;
                    tie = true;
                } else if (tableCard && cardStrength[getHigherThanTable(state.sets[currentPlayer], tableCard)] > cardStrength[tableCard]) {
                    playedCard = getHigherThanTable(state.sets[currentPlayer], tableCard);
                } else if (!tableCard) {
                    playedCard = getHighestCard(state.sets[currentPlayer]);
                } else {
                    playedCard = getLowestCard(state.sets[currentPlayer]);
                }
                break;
        }

        if (!tableCard || cardStrength[playedCard] > cardStrength[tableCard]) {
            tableCard = playedCard;
            winner = currentPlayer;
        }

        const cardIndex = state.sets[currentPlayer].indexOf(playedCard);
        state.sets[currentPlayer].splice(cardIndex, 1);
    }

    return tie ? null : winner; // Se houver empate, retornamos null
}

export function playGame() {
    let team1Wins = 0;
    let team2Wins = 0;
    let tiedRound = false;

    let roundStarter = 0;
    for (let round = 1; round <= 2; round++) {
        const roundWinner = playRound(roundStarter);
        roundStarter = roundWinner;

        if (roundWinner === null) { // Se a rodada terminou em empate
            tiedRound = true;
            continue;
        }

        if (tiedRound) { // Se a rodada anterior foi empatada, esta rodada decide o vencedor
            if (roundWinner === 0 || roundWinner === 2) {
                team1Wins += 2;
            } else {
                team2Wins += 2;
            }
            tiedRound = false;
            continue;
        } else if (roundWinner === 0 || roundWinner === 2) {
            team1Wins++;
            console.log(`Jogador ${roundWinner} do Time 1 venceu a rodada ${round}!`);
        } else {
            team2Wins++;
            console.log(`Jogador ${roundWinner} do Time 2 venceu a rodada ${round}!`);
        }
    }

    if (team1Wins === 2) {
        state.scoreT1++;
        console.log("Time 1 venceu o jogo!");
    } else if (team2Wins === 2) {
        state.scoreT2++;
        console.log("Time 2 venceu o jogo!");
    } else {
        console.log("O jogo terminou em empate!");
    }
}
