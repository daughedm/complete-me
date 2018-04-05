import { expect } from 'chai';
import { assert } from 'chai';
const Node = require("../scripts/Node");
const Trie = require("../scripts/Trie");


describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should have a default letter of null', () => {

    expect(node.letter).to.equal(null);
  });

  it('should have a word end set to false by default', () => {

    expect(node.endOfWord).to.equal(false);
  });

  it('should have children with a data type of object', () => {

    assert.isObject(node.children, 'node children should be objects');
  });
})