export default class Node {
    constructor(id, data = {}) {
        this.id = id;
        this.data = data;
        this.parent = null;
        this.children = new Array();
    }

    __getNode(){
        return this;
    }

    getChildIndex(childId) {
        let result;
        this.children.map((curr, index) => {
            if(curr.id == childId) {
                result = index;
            }
        }); 
        return result;
    }

    forgetChild(childId) {
        return this.children.splice(this.getChildIndex(childId), 1);
    }
}