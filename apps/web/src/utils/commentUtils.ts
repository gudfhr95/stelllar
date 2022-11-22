const unFlatten = (comments: any) => {
  const hashTable = Object.create(null);
  comments.forEach(
    (comment: any) =>
      (hashTable[comment.id] = { ...comment, childComments: [] })
  );

  const commentTree = [] as any;
  comments.forEach((comment: any) => {
    if (comment.parentComment) {
      hashTable[comment.parentComment.id].childComments.push(
        hashTable[comment.id]
      );
    } else {
      commentTree.push(hashTable[comment.id]);
    }
  });

  return commentTree;
};

const countChildren = (comment: any) => {
  if (!comment.childComments || comment.childComments.length === 0) {
    return 0;
  }

  let count = 0;
  comment.childComments.forEach((c: any) => {
    if (!c.isDeleted) {
      count++;
    }

    c.childCount = countChildren(c);
    count += c.childCount;
  });

  return count;
};

export const createCommentTree = (flatComments: any) => {
  flatComments = unFlatten(flatComments);
  flatComments.forEach((c: any) => (c.childCount = countChildren(c)));

  return flatComments;
};
