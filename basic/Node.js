export default class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }

    __getNode(){
        return this;
    }

    getChildIndex(child) {
        let result;
        this.children.map((curr, index) => {
            if(curr.data == child) {
                result = index;
            }
        }); 
        return result;
    }

    forgetChild(child) {
        this.children.splice(this.getChildIndex(child), 1);
    }
}