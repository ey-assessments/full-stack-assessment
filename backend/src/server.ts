import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

interface Post {
  id: number;
  title: string;
  author?: string;
  excerpt?: string;
  publishedAt?: string;
}

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

const dataFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../data/posts.json'
);

async function readPostsFromDisk(): Promise<Post[]> {
  const fileContents = await readFile(dataFilePath, 'utf-8');
  const data = JSON.parse(fileContents) as unknown;

  if (!Array.isArray(data)) {
    throw new Error('Posts data file must contain an array');
  }

  return data as Post[];
}

async function writePostsToDisk(posts: Post[]): Promise<void> {
  const data = await writeFile(dataFilePath, JSON.stringify(posts,null,2));
  console.log(data);
  return data;
}
app.get('/api/posts', async (_req: Request, res: Response<Post[] | { message: string }>) => {
  try {
    const posts = await readPostsFromDisk();
    res.json(posts);
  } catch (error) {
    console.error('Failed to read posts data file', error);
    res.status(500).json({ message: 'Unable to load posts' });
  }
});

//Create a post
app.post('/api/posts',async (_req: Request, res: Response<Post | { message: string }>)=>{
  try{
    const posts = await readPostsFromDisk();
    const { title, author, excerpt } = _req.body;
    if(!title){
      return res.status(400).json({message: "Title is required"});
    }
    const newPost: Post = {
      id: posts.length ? posts[posts.length-1].id + 1 : 1,
      title,
      author,
      excerpt,
      publishedAt: new Date().toISOString(),
    }
    posts.push(newPost);
    await writePostsToDisk(posts);
    console.log(newPost,"newPost");
    res.status(201).json(newPost);
  }
  catch(error){
    console.log("Failed to create a post");
    res.status(500).json({message: "Unable to create the post"});
  }
});

//Update a post
app.put('/api/posts/:id',async (_req: Request, res: Response<Post | { message: string }>)=>{
  try{
    const posts = await readPostsFromDisk();
    const postId = Number(_req.params.id);
    const index = posts.findIndex((p)=>p.id === postId);
    if(index === -1){
      return res.status(404).json({message: "Post not found"});
    }
    posts[index] = {
      ...posts[index],
      ..._req.body,
    }
    await writePostsToDisk(posts);
    res.json(posts[index]);
  }
  catch(error){
    console.log("Failed to update the post");
    res.status(500).json({message: "Unable to update the post"});
  }
});
//Delete a post
app.delete('/api/posts/:id',async (_req: Request, res: Response<Post | { message: string }>)=>{
  try{
    const posts = await readPostsFromDisk();
    const postId = Number(_req.params.id);
    const updatedPosts = posts.filter((p)=>p.id == postId);
    if(updatedPosts.length === posts.length){
      return res.status(404).json({message: "Post not found"});
    }
    await writePostsToDisk(updatedPosts);
    res.json().send();

  }
  catch(error){
    console.log("Failed to delete the post");
    res.status(500).json({message: "Unable to delete the post"});
  }
});
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
