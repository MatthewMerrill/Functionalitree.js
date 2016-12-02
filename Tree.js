var TreeNode = require('./TreeNode.js');

function fromInorder(str) {
  if (!str) return undefined;
  var mid = Math.floor(str.length/2);
  var r = new TreeNode(str[mid]);
  r.left = fromInorder(str.substring(0,mid));
  r.right = fromInorder(str.substring(mid+1));
  return r;
}
module.exports.fromInorder = fromInorder;

function fromHeapArray(list) {
	return new TreeNode(list);
}
module.exports.fromHeapArray = fromHeapArray;

function printSubtree(root, isRight, indent, out, map) {
  indent = indent || '';
  if (root.right)
    printSubtree(root.right, true, indent + (isRight ? '        ' : '|       '), out, map);
  if (isRight === true || isRight === false) {
    out(''+indent);
    out(isRight ? ' /' : ' \\');
    out('----- ');
  }
  out(map(root.val)+'\n');
  if (root.left)
    printSubtree(root.left, false, indent + (isRight ? '|       ' : '        '), out, map);
}
function display(root, out, map) {
  var str = '';
  out = out || ((a) => str+=a);
  map = map || ((a) => a);
  if (root.right) printSubtree(root.right, true, '', out, map);
  out(map(root.val)+'\n');
  if (root.left) printSubtree(root.left, false, '', out, map);
  console.log(str);
}
module.exports.display = display;