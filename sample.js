var Tree = require('./Tree.js');
var secret = ["r","s","s","s"," ","t","r","h","i","a","h","s","a","t","e","t","i"," ",null," ",null,"c",null,"i",null,"m",null," ",null,"e",null];
var myTree = Tree.fromHeapArray(secret);
Tree.display(myTree, undefined, JSON.stringify);