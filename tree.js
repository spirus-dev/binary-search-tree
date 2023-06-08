import Node from './node.js';

export default class Tree{
    constructor(inputArray){
        this.inputArray=this.removeDuplicatesAndSort(inputArray)
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

    levelOrderIteration(callback=null,root=this.root){
        let queue=[root];
        let result=[];
        while(queue.length!=0){
            let node=queue.shift();
            if(callback){
                callback(node.data);
            }
            else{
                result.push(node.data);
            }
            if(node.left!==null){
                queue.push(node.left);
            }
            if(node.right!==null){
                queue.push(node.right);
            }
        }
        if(!callback){
            return result;
        }
    }

    levelOrderRecursion(callback=null,array=[],queue=[],root=this.root){
        if(root===null) return
        if(callback){
            callback(root.data);
        }
        else{
            array.push(root.data);
        }
        queue.push(root.left);
        queue.push(root.right);

        while(queue.length!==0){
            let node=queue.shift();
            this.levelOrderRecursion(callback,array,queue,node);
        }
        if(!callback) return array;
    }

    inOrder(callback=null,array=[],root=this.root){
        if(root===null){
            return;
        }
        this.inOrder(callback,array,root.left);
        if(callback){
            callback(root.data);
        }
        else{
            array.push(root.data);
        }
        this.inOrder(callback,array,root.right);
        if(!callback){
            return array;
        }
    }

    preOrder(callback=null,array=[],root=this.root){
        if(root===null){
            return;
        }
        if(callback){
            callback(root.data);
        }
        else{
            array.push(root.data);
        }
        this.preOrder(callback,array,root.left);
        this.preOrder(callback,array,root.right);
        if(!callback){
            return array;
        }
    }

    postOrder(callback=null,array=[],root=this.root){
        if(root===null){
            return;
        }
        this.postOrder(callback,array,root.left);
        this.postOrder(callback,array,root.right);
        if(callback){
            callback(root.data);
        }
        else{
            array.push(root.data);
        }
        if(!callback){
            return array;
        }
    }

    removeDuplicatesAndSort(array){
        let set=new Set(array);
        return [...set].sort((a,b) => a - b);
    }
    
    insert(value){
        if(this.inputArray.includes(value)){
            console.log("Value already exists in the BST");
        }
        else{
            let newArray=this.inputArray;
            newArray.push(value);
            this.inputArray=this.removeDuplicatesAndSort(newArray);
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

    delete(value){
        if(!this.inputArray.includes(value)){
            console.log("Node does not exists in the BST");
        }
        else{
            let newArray=this.inputArray;
            newArray.splice(newArray.indexOf(value),1);
            this.inputArray=this.removeDuplicatesAndSort(newArray);
            this.root=this.deleteNode(this.root,value);
        }
    }

    deleteNode(root,value){
        if(root===null){
            return root;
        }
        else if(value<root.data){
            root.left=this.deleteNode(root.left,value);
        }
        else if(value>root.data){
            root.right=this.deleteNode(root.right,value);
        }
        else{
            if(root.left===null){
                return root.right;
            }
            else if(root.right===null){
                return root.left;
            }
            else{
                root.data=this.findInorderSuccessor(root.right);
                root.right=this.deleteNode(root.right,root.data);
            }
        }
        return root;
    }

    findInorderSuccessor(root){
        let minimum=root.data;
        while(root.left!==null){
            root=root.left;
            minimum=root.data;
        }
        return minimum;
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

    height(root=this.root){
        if(root===null){
            return -1;
        }
        let leftHeight=this.height(root.left);
        let rightHeight=this.height(root.right);

        return Math.max(leftHeight,rightHeight)+1;
    }

    depth(node,root=this.root,nodeDepth=0){
        if(node===root) return nodeDepth;
        else if(node.data<root.data){
            return this.depth(node,root.left,nodeDepth+1);
        }
        else{
            return this.depth(node,root.right,nodeDepth+1);
        }
    }

    isBalanced(root=this.root){
        if(root===null) return true;
        let heightDifference= Math.abs(this.height(root.left)-this.height(root.right));
        return (heightDifference<=1 && this.isBalanced(root.left) && this.isBalanced(root.right));
    }

    rebalance(root=this.root){
        let newArray=this.inOrder();
        this.root=this.buildTree(newArray);
    }
}