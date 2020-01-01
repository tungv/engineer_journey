const db = {
  users: [],
  posts: [],
  comments: [],
};

exports.createUser = async function(user) {
  const id = db.users.length + 1;
  user.id = String(id);
  db.users.push(user);

  return user;
};

exports.findUserById = async function(id) {
  return db.users.find(user => user.id === id);
};

exports.findPostById = async function(id) {
  return db.posts.find(post => post.id === id);
};

exports.findPosts = async function(condition) {
  return db.posts.filter(condition);
};
exports.findComments = async function(condition) {
  return db.comments.filter(condition);
};

exports.createPost = async function(post) {
  const id = db.posts.length + 1;
  post.id = String(id);

  db.posts.push(post);
  return post;
};

exports.findAllUsersByIdArray = async function(idArray) {
  const set = new Set(idArray);
  return db.users.filter(user => set.has(user.id));
};

exports.createComment = async function(comment) {
  const id = db.comments.length + 1;
  comment.id = String(id);

  db.comments.push(comment);
  return comment;
};
