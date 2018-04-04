const Node = require ("./Node.js");

class Trie {
  constructor() {
    this.totalWords = 0;
    this.root = new Node();
  }

  insert(string) {
    let stringArray = string.toLowerCase().split('');
    let currentNode = this.root;
    
    stringArray.forEach(letter => {
      let child = currentNode.children
      if (!child[letter]) {
        child[letter] = new Node(letter)
      }
      currentNode = child[letter]
    })
    if (!currentNode.endOfWord) {
      this.totalWords++;
      currentNode.endOfWord = true;
    }
  }

  // delete() {

  // }

  suggest(string) {
    let currentNode = this.root;
    let letters = string.toLowerCase().split('');
    let suggestions = [];
  
    if (!currentNode.children[letters[0]]) {
      return 'There are no matching words';
    }

    letters.forEach(letter => {
      if (currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    })

    const findWord = (word, currentNode) => {
      if (currentNode.endOfWord) {
        suggestions.push(word);
      }

      if (currentNode.children) {
        let childKeys = Object.keys(currentNode.children);
        childKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = word + child;

          findWord(newString, childNode);
        });
      }
    }

    findWord(string, currentNode);
    return suggestions;
  }
}

module.exports = Trie;
