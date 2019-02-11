import Node from "./Node.js";
import Tree from "./Tree.js";

describe('existing class', () => {
  
  it('node exist', () => {
    let newNode = new Node('data');
    expect(typeof newNode === 'object');
  }); 

});

describe('class properties', () => {
	it('node children is array', () => {
    let testedTree = createTestedTree();
	  	expect(typeof testedTree._root.children === 'array');
	}); 

});

describe("nodes have", () => {
  
  it('a parents', () => {
    let tree = createTestedTree();
    let result = []
    let expected = 'object,'.repeat(7).split(',');

    tree.traverseBF(node => {
      result.push(typeof node.parent);
    });

    result.push("");

    expect(result).toEqual(expected)
  });

});

describe("nodes funcs", () => {

  it('getChildIndex', () => {
    let node = createHandlerTree();

    expect(node.getChildIndex('t1')).toEqual(0);
    expect(node.getChildIndex('t2')).toEqual(1);
    expect(node.getChildIndex('t3')).toEqual(2);
    
  });

  it('forget child with levels', () => {
    let node = createHandlerTree();

    node.forgetChild('t2');

    function elementsWithChildren(node) {
      return node.children.length > 0 
        ? node.children.reduce((acc, curr) => {
          return acc + elementsWithChildren(curr);
        }, 1) 
        : 1;
    }

    expect(elementsWithChildren(node)).toEqual(4);
  });


});

function createTestedTree(){
  var tree = new Tree('one');

  tree._root.children.push(new Node('two'));
  tree._root.children[0].parent = tree;

  tree._root.children.push(new Node('three'));
  tree._root.children[1].parent = tree;

  tree._root.children.push(new Node('four'));
  tree._root.children[2].parent = tree;

  tree._root.children[0].children.push(new Node('five'));
  tree._root.children[0].children[0].parent = tree._root.children[0];

  tree._root.children[0].children.push(new Node('six'));
  tree._root.children[0].children[1].parent = tree._root.children[0];

  tree._root.children[2].children.push(new Node('seven'));
  tree._root.children[2].children[0].parent = tree._root.children[2];

/*

 tree

 one (depth: 0)
 ├── two (depth: 1)
 │   ├── five (depth: 2)
 │   └── six (depth: 2)
 ├── three (depth: 1)
 └── four (depth: 1)
     └── seven (depth: 2)

 */

  return tree;
}

function createHandlerTree(){
  let node = new Node('test');
  
  let child1 = new Node('t1');
  child1.parent = node;
  let child2 = new Node('t2');
  child2.parent = node;
  let child3 = new Node('t3');
  child3.parent = node; 


  let child4 = new Node('t4');
  child4.parent = child2;
  let child5 = new Node('t5');
  child5.parent = child2;
  let child6 = new Node('t6');
  child6.parent = child3;

  node.children.push(child1, child2, child3);
  child2.children.push(child4, child5);
  child3.children.push(child6);

  return node;

/*

 test 
 ├── t1 
 ├── t2
 │   ├── t4 
 │   └── t5
 └── t3 
     └── t6

 */

}