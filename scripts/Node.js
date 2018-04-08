class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.endOfWord = false;
    this.children = {};
    this.popularity = 0
  }
}

module.exports = Node;