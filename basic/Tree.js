import Queue from "./Queue.js";
import Node  from "./Node.js";


export default class Tree {
    constructor(id, data){
        let node = new Node(id, data);
        this._root = node;
    }

    __getNode(){
        return this._root; 
    }

    getElement(id, traversal = this.traverseBF) {
        let result = {};

        traversal.call(this, (node) => {
            if(node.id === id) {
                result = node;
            }
        });

        return result;
    }

    add(id, newParent = this._root.id, traversal = this.traverseDF) {
        let child  = new Node(id);
        let parent = null;

        let callback = (node) => {
            if(node.id === newParent){
                parent = node;
            }
            if(node.id === id){
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

    remove(id){
        let nodeToRemove = this.getElement(id); //deleted node link
        
        nodeToRemove.parent.__getNode().forgetChild(id);
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