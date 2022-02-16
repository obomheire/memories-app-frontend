import PostMessage from "../models/postMessage.js"
import mongoose from "mongoose"

export const getPosts = async (req, res) =>{

   try{
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages)
   }catch(error){
    res.status(404).json({Message: error.message})
   }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
      const title = new RegExp(searchQuery, 'i');

      const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

      res.json({ data: posts });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) =>{
    const post = req.body

    // console.log(post)
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
  try{
    await newPost.save()
    res.status(201).json(newPost)
  }catch(error){
    res.status(409).json({message: error.message})
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  
 try{
    // console.log(id) 
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body, { new: true });

  res.json(updatedPost);

 }catch(error){
  res.status(404).json({Message: error.message})
 }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

try{
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });

}catch(error){
  res.status(404).json({Message: error.message})
}
}

export const likePost = async (req, res) => {
  const { id } = req.params;

 try{
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);

 }catch(error){
  res.status(404).json({Message: error.message})
 }
}


// export default router;