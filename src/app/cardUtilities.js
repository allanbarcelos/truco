export const cardStrength = {
    'J♠': 0, 'J♣': 0, 'J♥': 0, 'J♦': 0,
    'Q♠': 1, 'Q♣': 1, 'Q♥': 1, 'Q♦': 1,
    'K♠': 2, 'K♣': 2, 'K♥': 2, 'K♦': 2,
    'A♣': 3, 'A♥': 3, 'A♦': 3,
    '2♠': 4, '2♣': 4, '2♥': 4, '2♦': 4,
    '3♠': 5, '3♣': 5, '3♥': 5, '3♦': 5,
    '7♦': 6,
    'A♠': 7,
    '7♥': 8,
    '4♣': 9
};



export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function generateDeck() {
    return Object.keys(cardStrength);
}

export function drawSets(deck, numSets, setSize) {
    const sets = [];

    for (let i = 0; i < numSets; i++) {
        sets.push(deck.splice(0, setSize));
    }

    return sets;
}
