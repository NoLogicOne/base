import Queue from "./Queue.js";

describe("is exsit", () => {
	it("object", () => {
		let q = new Queue();

		expect(typeof q).toEqual('object');
	});
});

describe("enqueue", () => {
	it("correct with str", () => {
		let Q = createTestedQueue();

		Q.enqueue("1");

		expect(Q._storage[7]).toEqual('1');
	});	
});

describe("dequeue", () => {
	it("delete element", () => {
		let Q = createTestedQueue();

		Q.dequeue();

		expect(Q._storage[1]).toEqual(undefined);
	});	

	it("return deleted", () => {
		let Q = createTestedQueue();

		expect(Q.dequeue()).toEqual(1);
	});	

	it("save size", () => {
		let Q = createTestedQueue();
		let oldSize = Q.size();

		Q.dequeue();

		expect(Q.size()).toEqual(oldSize - 1);
	});	
});

describe("size", () => {
	it("base size = 6", () => {
		let Q = createTestedQueue();

		expect(Q.size()).toEqual(6);
	});	

	it("size after enqueue/dequeue = 6", () => {
		let Q = createTestedQueue();

		Q.enqueue(5);
		Q.dequeue();

		expect(Q.size()).toEqual(6);
	});	
});


function createTestedQueue() {
	let Q = new Queue();

	Q._storage[1] = 1;
	Q._storage[2] = 2;
	Q._storage[3] = 3;
	Q._storage[4] = 4;
	Q._storage[5] = 5;
	Q._storage[6] = 6;
	Q._newestIndex = 7; 

	return Q;
}
