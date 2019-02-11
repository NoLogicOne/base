import Queue from "./Queue.js";
import Node  from "./Node.js";


export default class Tree {
    constructor(data){
        let node = new Node(data);
        this._root = node;
    }

    __getNode(){
        return this._root; 
    }

    add(data, newParent = this._root, traversal = this.traverseDF) {
        let child  = new Node(data);
        let parent = null;

        let callback = (node) => {
            if(node.data === newParent){
                parent = node;
            }
            if(node.data === data){
                throw new Error('this element already exists');
            }
        };

        traversal.call(this, callback);

        if (parent){
            child.parent = parent;
            parent.children.push(child);
        } else {
            throw new Error('parent is not exist');
        }

    }

    remove(data){
        let nodeToRemove = "";

        let callback = (node) => {
            if(node.data === data){
                nodeToRemove = node;
            }
        };

        this.traverseBF(callback);

        nodeToRemove.parent.__getNode().forgetChild(data);

    }

    traverseDF(callback){
        (function recurse(currentNode)  {
            currentNode.children.map(curr => {
                recurse(curr);
            })
            
            callback(currentNode);

        })(this._root);      
    }

    traverseBF(callback){
        let queue = new Queue();

        queue.enqueue(this._root);

        let currentTree = queue.dequeue();

        while(currentTree){
            currentTree.children.map(curr => {
                queue.enqueue(curr);
            });

            callback(currentTree);
            currentTree = queue.dequeue();
        }
    }

}