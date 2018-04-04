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
      expect(tree.totalWords).to.equal(1);
      tree.insert('sauce');
      
      expect(tree.totalWords).to.equal(2);
    });

    it('it should not increase count when string is already in the trie', () => {
      tree.insert('pizza');
      tree.insert('pizza');
      
      expect(tree.totalWords).to.equal(1);
    });

    it('should update endOfWord to true', () => {
      tree.insert('car');
      // console.log(JSON.stringify(tree, null, 2));
      // console.log(tree.root.children['c'].children['a'])
      expect(tree.root.children['c'].children['a'].children['r'].endOfWord).to.equal(true)
    })
  })

  describe('suggest', () => {

    it('should be able suggest words based on prefix entered', () => {
      tree.insert('bam');
      tree.insert('bambi');
      tree.insert('bama');
      tree.insert('ball');
      const suggest = tree.suggest('ba');
      
      expect(suggest === ['bam', 'bambi', 'bama', 'ball']);
    });

    it('if prefix is a word it should show up in the suggestion array', () => {
      tree.insert('bam');
      tree.insert('bambi');
      tree.insert('bama');
      tree.insert('ball');
      const suggest = tree.suggest('bam');
      
      expect(suggest === ['bam', 'bambi', 'bama']);
    });

    it('if prefix does not hav any associated word in the trie return a statment', () => {
      tree.insert('bam');
      tree.insert('bambi');
      tree.insert('bama');
      tree.insert('ball');
      const suggest = tree.suggest('la');

    expect(suggest).to.equal('There are no matching words');
  });
})
})
