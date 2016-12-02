function Node(_val, _left, _right) {

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
          cur.left = new Node();
          init(heap, cur.left, pos*2+1);
        }
        if(heap[pos * 2 + 2]) {
          cur.right = new Node();
          init(heap, cur.right, pos*2+2);
        }
      }
      init(_val, this, 0);
    }
  }
}
Node.prototype.inorder = Node.prototype.inorder || function() {
  var ret = [];
  if (this.left) ret = ret.concat(this.left.inorder());
  ret.push(this.val);
  if (this.right) ret = ret.concat(this.right.inorder());
  return ret;
};
Node.prototype.preorder = Node.prototype.preorder || function() {
  var ret = [];
  ret.push(this.val);
  if (this.left || this.right) {
    if (this.left) ret = ret.concat(this.left.preorder());
    else ret = ret.push(undefined);
    if (this.right) ret = ret.concat(this.right.preorder());
    else ret = ret.push(undefined);
  }
  return ret;
};
Node.prototype.postorder = Node.prototype.postorder || function() {
  var ret = [];
  if (this.left) ret = ret.concat(this.left.postorder());
  if (this.right) ret = ret.concat(this.right.postorder());
  ret.push(this.val);
  return ret;
};
Node.prototype.heapify = Node.prototype.heapify || function() {
  function _h(curs) {
    var ret = [];
    ret = ret.concat(curs.map((a)=>a.val));
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

function fromInorder(str) {
  if (!str) return undefined;
  var mid = Math.floor(str.length/2);
  var r = new Node(str[mid]);
  r.left = fromInorder(str.substring(0,mid));
  r.right = fromInorder(str.substring(mid+1));
  return r;
}
console.log(new Node(fromInorder('merry christmas').heapify()).inorder().join(''));
