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
      let child = currentNode.children;
      if (!child[letter]) {
        child[letter] = new Node(letter)
      }
      currentNode = child[letter];
    })
    
    if (!currentNode.endOfWord) {
      this.totalWords++;
      currentNode.endOfWord = true;
    }
  }

  delete(string) {
    let currentNode = this.root;
    let stringArray = string.toLowerCase().split('');

    stringArray.forEach(letter => {
      if (currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    })
    
    if (currentNode.endOfWord) {
    currentNode.endOfWord = false;
    this.totalWords--;
    }
  }

  sortSuggestions(suggestions) {
    suggestions.sort((wordA, wordB) => {
      return wordB.popularity - wordA.popularity;
    });

    return suggestions.map(wordObj => wordObj.word);
  }

  suggest(prefix) {
    let currentNode = this.root;
    let prefixArray = prefix.toLowerCase().split('');
    let suggestions = [];
  
    if (!currentNode.children[prefixArray[0]]) {
      return 'There are no matching words';
    }

    prefixArray.forEach(letter => {
      if (currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    })

    const findWord = (prefix, currentNode) => {
      if (currentNode.endOfWord) {
        suggestions.push({word: prefix, popularity: currentNode.popularity });
      }

      if (currentNode.children) {
        let childKeys = Object.keys(currentNode.children);
        childKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = prefix + child;

          findWord(newString, childNode);
        });
      }
    }

    findWord(prefix, currentNode);
    return this.sortSuggestions(suggestions);
  }

  populate(wordArray) {
    wordArray.forEach(word => this.insert(word));
  }

  select(string) {
    let currentNode = this.root;
    let stringArray = string.toLowerCase().split('');

    stringArray.forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
      } else {
        return 'that word does not exist';
      }
    })
      currentNode.popularity++;
    }
  }



module.exports = Trie;
