import { useState } from "react";
import { updatePost } from "../services/api";
import type { Post } from '../types/post';
type props = {
    post: Post;
    onUpdated: (post : Post)=>void;
    onCancel: ()=>void;
}
function EditPostForm({post, onUpdated,onCancel}:props): JSX.Element{
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [excerpt,setExcerpt] = useState("");
    const submit = async(e:React.FormEvent)=>{
        e.preventDefault();
        const updated = await updatePost(post.id,{
            title,
            author,
            excerpt
        });
        onUpdated(updated)
    }
    return(
        <form onSubmit={submit}>
            <h3>Edit post</h3>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            <textarea value={excerpt} onChange={(e)=>setExcerpt(e.target.value)}/>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}
export default EditPostForm;