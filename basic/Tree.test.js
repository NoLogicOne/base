import Tree from "./Tree.js";
import Node from "./Node.js";

var testedTree = createTestedTree();

describe('existing class', () => {

  it('tree exist', () => {
    let newTree = new Tree('data');
    expect(typeof newTree === 'object');
  });

  it('testedTree exist', () => {
  	expect(typeof testedTree === 'object');
  });

});

describe('class properties', () => {
  
	it('tree-root is node', () => {
		let newTree = new Tree('data');
		expect(newTree._root instanceof Node);
	});

});

describe("traverseDF", () => {
  
  it('correct with testedTree', () => {
  	let expectedArray = ['five', 'six', 'two', 'three', 'seven', 'four', 'one'];
  	let result = [];

  	testedTree.traverseDF((node) => {
  		result.push(node.data);
  	})

  	expect(result).toEqual(expectedArray);
  });
});

describe("Tree add", () => {
  
  it('correct with default', () => {
  	let expectedArray = ['five', 'six', 'eight', 'two', 'three', 'seven', 'four', 'one'];
  	let result = [];

  	let tree = createTestedTree();
  	tree.add('eight', 'two');


  	tree.traverseDF((node) => {
  		result.push(node.data);
  	});

  	expect(result).toEqual(expectedArray);
  });

  it('correct with DF', () => {
  	let expectedArray = ['five', 'six', 'eight', 'two', 'three', 'seven', 'four', 'one'];
  	let result = [];

  	let tree = createTestedTree();
  	tree.add('eight', 'two', tree.traverseDF);


  	tree.traverseDF((node) => {
  		result.push(node.data);
  	});

  	expect(result).toEqual(expectedArray);
  });

  it('correct with BF', () => {
  	let expectedArray = ['one', 'two', 'three', 'four', 'five', 'six', 'eight', 'seven'];
  	let result = [];

  	let tree = createTestedTree();
  	tree.add('eight', 'two', tree.traverseBF);


  	tree.traverseBF((node) => {
  		result.push(node.data);
  	});

  	expect(result).toEqual(expectedArray);
  });

});

describe("Tree remove", () => { 
  it("exist", () => {
  	let tree = createTestedTree();

  	expect(typeof tree.remove).toEqual("function");
  });

  it("remove last", () => {
  	let expectedArray = ['one', 'two', 'three', 'four', 'five', 'seven'];
  	let result = [];
  	
  	let tree = createTestedTree();
  	tree.remove('six');

  	tree.traverseBF((node) => {
  		result.push(node.data);
  	})

  	expect(result).toEqual(expectedArray);
  });

  it("remove middle", () => {
  	let expectedArray = ['one', 'three', 'four', 'seven'];
  	let result = [];
  	
  	let tree = createTestedTree();
  	tree.remove('two');

  	tree.traverseBF((node) => {
  		result.push(node.data);
  	})

  	expect(result).toEqual(expectedArray);
  });

});

describe("traverseBF", () => {
  
  it('correct with testedTree', () => {
  	let expectedArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  	let result = [];

  	testedTree.traverseBF((node) => {
  		result.push(node.data);
  	})

  	expect(result).toEqual(expectedArray);
  });
});



function createTestedTree(){
	var tree = new Tree('one');

	tree._root.children.push(new Node('two'));
	tree._root.children[0].parent = tree.__getNode();

	tree._root.children.push(new Node('three'));
	tree._root.children[1].parent = tree.__getNode();

	tree._root.children.push(new Node('four'));
	tree._root.children[2].parent = tree.__getNode();

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