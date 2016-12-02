function TreeNode(_val, _left, _right) {
  if (_val) {
    if (typeof _val == 'number') {
      console.log('itsa number');
      this.val = _val;
      this.left = _left;
      this.right = _right;
    } else {
      function init(heap, cur, pos) {
        cur.val = heap[pos];
        if(heap[pos * 2 + 1]) {
          cur.left = new TreeNode();
          init(heap, cur.left, pos*2+1);
        }
        if(heap[pos * 2 + 2]) {
          cur.right = new TreeNode();
          init(heap, cur.right, pos*2+2);
        }
      }
      init(_val, this, 0);
    }
  }
}
TreeNode.prototype.inorder = TreeNode.prototype.inorder || function(func) {
  var ret = [];
  func = func || ((a) => ret.push(a.val));
  if (this.left) this.left.inorder(func);
  func(this);
  if (this.right) this.right.inorder(func);
  return ret;
};
TreeNode.prototype.preorder = TreeNode.prototype.preorder || function(func) {
  var ret = [];
  func = func || ((a) => ret.push(a.val));
  func(this);
  if (this.left) this.left.preorder(func);
  if (this.right) this.right.preorder(func);
  if (ret) return ret;
};
TreeNode.prototype.postorder = TreeNode.prototype.postorder || function(func) {
  var ret = [];
  func = func || ((a) => ret.push(a.val));
  if (this.left) this.left.postorder(func);
  if (this.right) this.right.postorder(func);
  func(this);
  if (ret) return ret;
};
TreeNode.prototype.heapify = TreeNode.prototype.heapify || function() {
  function _h(curs) {
    var ret = [];
    ret = ret.concat(curs.map((a)=>a?a.val:undefined));
    var next = [];
    for (var cur of curs) {
      next.push(cur ? cur.left : undefined);
      next.push(cur ? cur.right : undefined);
    }
    if (next.every((a)=>!a))
      return ret;
    return ret.concat(_h(next));
  }
  return _h([this]);
}

module.exports = TreeNode;