import { expect } from 'chai';
import { assert } from 'chai';
const Node = require("../scripts/Node");
const Trie = require("../scripts/Trie");


describe('Trie', () => {
  let tree;

  beforeEach(() => {
    tree = new Trie();
  });

  it('should have a rootNode node defaulted to a new Node', () => {
    
    expect(tree.rootNode).to.equal(Node);
  });

  describe('insert', () => {
  
    it('should be able to increase the count when adding a new word', () => {
      tree.insert('pizza');
      expect(tree.count).to.equal(1);
      tree.insert('sauce');
      
      expect(tree.count).to.equal(2);
    });

    it('it should not increase count when string is already in the trie', () => {
      tree.insert('pizza');
      tree.insert('pizza');
      
      expect(tree.count).to.equal(1);
    });
  })

  describe('suggest', () => {

    it('should be able to increase the count when adding a new word', () => {
      tree.insert('pizza');
      expect(tree.count).to.equal(1);
      tree.insert('sauce');

      expect(tree.count).to.equal(2);
    });

    it('it should not increase count when string is already in the trie', () => {
      tree.insert('pizza');
      tree.insert('pizza');

      expect(tree.count).to.equal(1);
    });
  })
})


//INSERT
// is a function
// increase count when inserting a word
//