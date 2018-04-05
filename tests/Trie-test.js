import { expect } from 'chai';
import { assert } from 'chai';
import fs from 'fs';
const Node = require("../scripts/Node");
const Trie = require("../scripts/Trie");

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Trie', () => {
  let tree;

  beforeEach(() => {
    tree = new Trie();
  });

  it('should have a rootNode node defaulted to a new Node', () => {
    
    expect(tree.root).to.deep.equal(new Node());
  });

  it('should have no words to start', () => {

    expect(tree.totalWords).to.equal(0);
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
      
      expect(suggest).to.deep.equal(['bam', 'bambi', 'bama', 'ball']);
    });

    it('if prefix is a word it should show up in the suggestion array', () => {
      tree.insert('bam');
      tree.insert('bambi');
      tree.insert('bama');
      tree.insert('ball');
      const suggest = tree.suggest('bam');
      
      expect(suggest).to.deep.equal(['bam', 'bambi', 'bama']);
    });

    it('if prefix does not have any associated word in the trie return a statment', () => {
      tree.insert('bam');
      tree.insert('bambi');
      tree.insert('bama');
      tree.insert('ball');
      const suggest = tree.suggest('la');

    expect(suggest).to.equal('There are no matching words');
  });

    it('should suggest words when populated with the dictionary', () => {
      tree.populate(dictionary)
      const suggest = tree.suggest('piz');
      
      expect(suggest).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
    });
})

  describe('populate', () => {

    it('should populate the trie with all the words', () => {
      tree.populate(dictionary)
      const treeWords = tree.totalWords;

      expect(treeWords).to.deep.equal(234371);
    });
  })

  describe('delete', () => {

    it('should switch the end of word property to false', () => {
      
      tree.insert('car');
      expect(tree.root.children['c'].children['a'].children['r'].endOfWord).to.equal(true)
      tree.delete('car')
  
      expect(tree.root.children['c'].children['a'].children['r'].endOfWord).to.equal(false)
    });

    it('should decriment the word count', () => {
      tree.insert('pizza');
      expect(tree.totalWords).to.equal(1);
      tree.insert('sauce');
      expect(tree.totalWords).to.equal(2);
      tree.delete('sauce')
      expect(tree.totalWords).to.equal(1);
    });

    it('should not decriment the word count if you delete a word that is not there', () => {
      tree.insert('pizza');
      expect(tree.totalWords).to.equal(1);
      tree.insert('pizzazz');
      expect(tree.totalWords).to.equal(2);
      tree.delete('pizza')
      tree.delete('pizza')
      expect(tree.totalWords).to.equal(1);
    });
  })
})
