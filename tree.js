import Node from './node.js';

export default class Tree{
    constructor(inputArray){
        this.inputArray=this.removeDuplicates(inputArray)
        this.root=null;
    }

    buildTree(array=this.inputArray, start=0, end=this.inputArray.length-1){
        if(start>end) return null;
        let mid=parseInt((start+end)/2);
        let node=new Node(array[mid]);
        node.left=this.buildTree(array,start,mid-1);
        node.right=this.buildTree(array,mid+1,end);
        return node;
    }

    prettyPrint(node=this.root, prefix = "", isLeft = true){
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    inorder(node=this.root){
        if(node===null){
            return;
        }
        this.inorder(node.left);
        console.log(`${node.data}`);
        this.inorder(node.right);
    }

    preorder(node=this.root){
        if(node===null){
            return;
        }
        console.log(`${node.data}`);
        this.preorder(node.left);
        this.preorder(node.right);
    }

    postorder(node=this.root){
        if(node===null){
            return;
        }
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(`${node.data}`);
    }

    removeDuplicates(array){
        let set=new Set(array);
        return [...set];
    }
    
    insert(value){
        if(this.inputArray.includes(value)){
            console.log("Value already exists in the BST");
        }
        else{
            this.root=this.insertNode(this.root,value);
        }
    }

    insertNode(root,value){
        if(root===null){
            root=new Node(value);
            return root;
        }
        if(value<root.data){
            root.left=this.insertNode(root.left,value);
        }
        else{
            root.right=this.insertNode(root.right,value);
        }
        return root;
    }

    delete(){

    }

    find(value){
        if(!this.inputArray.includes(value)){
            console.log("Node does not exists in the BST");
        }
        else{
            let node=this.findNode(this.root,value);
            return node;
        }
    }

    findNode(root,value){
        if(root.data===value){
            return root;
        }
        if(value<root.data){
            this.findNode(root.left,value);
        }
        else{
            this.findNode(root.right,value);
        }
    }
}