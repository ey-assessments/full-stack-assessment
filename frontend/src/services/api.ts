import type { Post } from '../types/post';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/api/posts`);

  if (!response.ok) {
    throw new Error(`Failed to load posts: ${response.status}`);
  }

  const data: Post[] = await response.json();
  return data;
};

export const createPost = async (post: Omit<Post,'id'>) : Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/api/posts`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(post),
  });
  if(!response.ok){
    throw new Error(`Failed to load posts: ${response.status}`);
  }
  return response.json();
}

export const updatePost = async( id: number,updates: Partial<Post>) : Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(updates),
  });
  if(!response.ok){
    throw new Error(`Failed to update post: ${response.status}`);
  }
  return response.json();
}
export const DeletePost = async( id: number,deletes: Partial<Post>) : Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(deletes),
  });
  if(!response.ok){
    throw new Error(`Failed to update post: ${response.status}`);
  }
  return response.json();
}
