class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.endOfWord = false;
    this.children = {};
  }
}

module.exports = Node;