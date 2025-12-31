import { useState } from 'react';
import { createPost } from '../services/api';
import type { Post } from '../types/post';

type props = {
  onCreated:(post: Post)=>void;
};

function CreatePostForm({ onCreated }: props) : JSX.Element{
    const [title,setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [excerpt,setExcerpt] = useState("");
    const [loading,setLoading] = useState(false);
    const submit = async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const post = await createPost({ title,author,excerpt});
            onCreated(post);
            setTitle('');
            setAuthor('');
            setExcerpt('');
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <form onSubmit={submit}>
            <h2>Create a post</h2>
            <input placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input placeholder='Author' value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            <textarea placeholder='Excerpt' value={excerpt} onChange={(e)=>setExcerpt(e.target.value)}/>
            <button disabled={loading}>
                {loading?"Creating.." : 'Create'}
            </button>
        </form>
    )
}
export default CreatePostForm;