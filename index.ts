class TreeNode {
  left?: TreeNode;
  right?: TreeNode;
  word: string;
  translate: string
  height?: number = 1;

  constructor(value: string, translate: string) {
    this.word = value;
    this.translate = translate;
    this.left = null;
    this.right = null;
  };
};

class BinaryTree {
  root: TreeNode;
  constructor() {
    this.root = null;
  };
  insert(word: string, translate: string): void {
    let newNode = new TreeNode(word, translate);
    if (this.root === null)
      this.root = newNode;
    else
      this.insertNode(this.root, newNode);
  }

  insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.word < node.word) {
      if (node.left === null)
        node.left = newNode;
      else
        this.insertNode(node.left, newNode);
    }
    else if (newNode.word > node.word) {
      if (node.right === null)
        node.right = newNode;
      else
        this.insertNode(node.right, newNode);
    }
    else {
      return false
    }
  }

  print_tree(root = this.root): string | null {
    let queue: TreeNode[] = [];
    let res: string = "";
    if (this.root === null) {
      return null
    }
    queue.push(root);
    while ((queue.length) > 0) {
      let node: TreeNode = queue.shift()
      res += (" " + String(node.word + ":" + node.translate + ","))
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return res
  }

  search(findWord: string): string | null {
    return this.searchNode(this.root, findWord);
  }

  searchNode(node: TreeNode, findWord: string): string | null {
    if (node === null) {
      return null;
    } else if (findWord < node.word) {
      return this.searchNode(node.left, findWord);
    } else if (findWord > node.word) {
      return this.searchNode(node.right, findWord);
    } else {
      return node.translate;
    }
  }
}

const tree = new BinaryTree();

const fs = require("fs");
let fileContent: string[] = fs.readFileSync("Dict.txt", "utf8")
  .split(/\r?\n/)
  .map(item => item.trim().replace(':', ' ').split(" "))
  .filter(item => item != '')
fileContent.forEach(item => tree.insert(item[0], item[1]));

console.log(tree.search("qwe") === null);
console.log(tree.search("home") === "дом");
console.log(tree.print_tree())

