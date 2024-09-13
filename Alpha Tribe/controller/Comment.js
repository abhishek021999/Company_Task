const Comment = require("../model/Comment");
const Post = require("../model/stockpost");
// add comment
const addComment = async (req, res) => {
    const { comment } = req.body;
    const Ispresent=await Comment.findOne({comment})
    if(Ispresent){
      return res.json({message:"comment already present"})
    }
    try {
      const newComment = new Comment({ comment, post: req.params.postId, user: req.user.id });
      await newComment.save();
      res.status(201).json({ success: true, newComment, message: 'Comment added successfully' }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // delete comment
// Delete a comment from a post

const deleteComment = async (req, res) => {
  const {  commentId } = req.params;

  try {
    const post = await Comment.findByIdAndDelete(commentId);

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

  module.exports={addComment,deleteComment}