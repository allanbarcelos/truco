import { cardStrength } from './cardUtilities.js';

export function getHighestCard(player) {
    return player.reduce((highest, card) => cardStrength[card] > cardStrength[highest] ? card : highest);
}

export function getLowestCard(player) {
    return player.reduce((lowest, card) => cardStrength[card] < cardStrength[lowest] ? card : lowest);
}

export function hasMultipleStrongCards(player) {
    return player.filter(card => cardStrength[card] >= 6).length > 1;
}

export function getSecondHighestCard(player) {
    let cards = [...player];
    cards.sort((a, b) => cardStrength[b] - cardStrength[a]); // Ordena em ordem decrescente
    return cards[1];
}

export function getHigherThanTable(player, tableCard) {
    const playableCards = player.filter(card => cardStrength[card] > cardStrength[tableCard]);
    playableCards.sort((a, b) => cardStrength[a] - cardStrength[b]); // Ordena em ordem crescente
    return playableCards[0];
}

export function canTieRound(player, tableCard) {
    return player.includes(tableCard);
}