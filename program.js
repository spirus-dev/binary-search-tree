import Tree from './tree.js'

//1
function randomArray(size){
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

let tree=new Tree(randomArray(10));
tree.root=tree.buildTree();

//2
console.log(tree.isBalanced());

//3
console.log(`Level order Iterative: ${tree.levelOrderIteration()}`);
console.log(`Level order Recursive: ${tree.levelOrderRecursion()}`);
console.log(`Preorder : ${tree.preOrder()}`);
console.log(`Postorder : ${tree.postOrder()}`);
console.log(`Inorder : ${tree.inOrder()}`);

//4
let newNodes=randomArray(5);
newNodes.forEach(node=>tree.insert(node));

//5
console.log(tree.isBalanced());

//6
tree.rebalance();

//7
console.log(tree.isBalanced());

//8
console.log(`Level order : ${tree.preOrder()}`);
console.log(`Level order Recursive: ${tree.levelOrderRecursion()}`);
console.log(`Preorder : ${tree.preOrder()}`);
console.log(`Postorder : ${tree.postOrder()}`);
console.log(`Inorder : ${tree.inOrder()}`);

