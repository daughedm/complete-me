const Node = require ("./Node.js");

class Trie {
  constructor() {
    this.totalWords = 0;
    this.root = new Node();
  }

  insert(word) {
    let wordArray = word.toLowerCase().split('');
    let currentNode = this.root;

    wordArray.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }
      currentNode = currentNode.children[letter]
    })
    if (!currentNode.wordEnd) {
      this.totalWords++;
    }
    currentNode.wordEnd = true;
  }

  // delete() {

  // }

  suggest() {

  }
}

module.exports = Trie;
