const Post = require("../models/Posts");
const minifaker = require("minifaker");
const { success, error } = require("../utils/responseWrapper");
require("minifaker/locales/en");

const getPosts = async (req, res) => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const DEFAULT_LIMIT = 10;

  try {
    const posts = await Post.find({}).skip(skip).limit(DEFAULT_LIMIT);

    return res.json(success(200, { posts }));
  } catch (e) {
    res.send(error(400, e));
  }
};

const createPosts = async (req, res) => {
  const { total } = req.body;
  const posts = [];

  try {
    const compilePosts = async (_) => {
      for (let index = 0; index < total; index++) {
        // random number between 1 to 70
        const randomAvatarNum = Math.floor(Math.random() * 70) + 1;
        const randomImageNum = Math.floor(Math.random() * 70) + 1;

        const post = new Post({
          username: minifaker.username(),
          avatar: `https://i.pravatar.cc/150?img=${randomAvatarNum}`,
          image: `https://i.pravatar.cc/600?img=${randomImageNum}`,
          caption: `${minifaker.word()} ${minifaker.word()} ${minifaker.cityName()}`,
        });

        posts.push(post);
      }
    };

    await compilePosts();
    await Post.insertMany(posts);

    res.json(success(201, "Post created successfully."));
  } catch (e) {
    res.send(error(401, e));
  }
};

module.exports = {
  getPosts,
  createPosts,
};
