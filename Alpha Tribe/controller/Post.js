const Comment = require("../model/Comment");
const Post = require("../model/stockpost");

// Create a stock post
const createPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  try {
    const post = new Post({ stockSymbol, title, description, tags, user: req.user.id });
    await post.save();
    res.status(201).json({ success: true, post, message: 'Post created successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts with filtering and sorting
const getPosts = async (req, res) => {
  // Extract query parameters from the request
  const { stockSymbol, tags, sortBy } = req.query;

  // Initialize an empty query object
  let query = {};

  // Check if a stockSymbol was provided in the query
  if (stockSymbol) {
    // Add the stockSymbol to the query object
    query.stockSymbol = stockSymbol;
  }

  // Check if tags were provided in the query
  if (tags) {
    // Split the tags string into an array and add to the query object
    const tagsArray = tags.split(',');
    query.tags = { $in: tagsArray };
  }

  try {
    // Fetch posts based on the query object
    let posts;

    // Check the sortBy parameter to determine sorting order
    if (sortBy === 'likesCount') {
      // Sort by likesCount in descending order
      posts = await Post.find(query).sort({ likesCount: -1 }).populate('user', 'username');
    } else {
      // Default to sorting by createdAt in descending order
      posts = await Post.find(query).sort({ createdAt: -1 }).populate('user', 'username');
    }

    // Send the retrieved posts as a JSON response
    res.json(posts);
  } catch (error) {
    // Handle any errors that occurred during the query
    res.status(500).json({ error: error.message });
  }
};
// ⦁	Get a Single Stock Post 
const getSingle=async(req,res)=>{
  const {postId}=req.params
  try {
    const post=await Post.findById(postId)
    console.log("singledata",post)
    res.json({ postId:post._id, stockSymbol:post.stockSymbol, title:post.title, description:post.description, likesCount:post.likesCount
    })
  } catch (error) {
    res.send("something went wrong")
  }
}
// delete
const deleteSingle=async(req,res)=>{
  const {postId}=req.params
  try {
    const post=await Post.findByIdAndDelete(postId)
    console.log("singledata",post)
    res.json({ success: true, message: 'Post deleted successfully' }
    )
  } catch (error) {
    res.send("something went wrong")
  }
}



module.exports={createPost,getPosts,getSingle,deleteSingle}