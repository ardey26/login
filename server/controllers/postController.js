const Post = require('../models/post')

// @desc    CREATE POST
// @route   POST /api/post
// @access  PRIVATE
const createPost = async (req, res) => {
    try {
        const { description } = req.body
        const { id } = req.user

        const post = new Post({
            user: id,
            description: description
        })

        await post.save();
        
        console.log("CREATION SUCCESSFUL");
        res.json({message: "POST CREATED"});
    } catch (err) {
        console.error(err.message);
    }
}

// @desc    READ POST (ALL)
// @route   GET /api/post
// @access  PRIVATE
const readPosts = async (req, res) => {
    try {
        const { id } = req.user;

        const posts = await Post.find({user: id});

        res.json(posts).status(200);
    } catch (err) {
        console.error(err.message);
    }
}

// @desc    UPDATE POST
// @route   PUT /api/post/:id
// @access  PRIVATE
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        
        if (post.user.toString() !== req.user.id){
            res.json({error: "USER NOT AUTHORIZED"}).status(401);
        }
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true,})
        res.json(updatedPost).status(200);
    } catch (err) {
        console.error(err.message);
    }
}

// @desc    DELETE POST
// @route   DELETE /api/post/:id
// @access  PRIVATE
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        
        if (post.user.toString() !== req.user.id){
            res.json({error: "USER NOT AUTHORIZED"}).status(401);
        }
        await post.remove();
        res.json({message: "POST DELETED"}).status(200);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    createPost,
    readPosts,
    updatePost,
    deletePost
}