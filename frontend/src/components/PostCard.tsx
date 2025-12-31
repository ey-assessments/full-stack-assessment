import { useState } from 'react';
import type { Post } from '../types/post';
import EditPostForm from './EditPostForm';

type PostCardProps = {
  post: Post;
  onUpdated: (post:Post)=>void;
  onDeleted: (id: Number) => void;
};

function PostCard({ post, onUpdated, onDeleted }: PostCardProps): JSX.Element {
  const { title, author, excerpt, publishedAt } = post;
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : null;
  const [editing,setEditing] = useState(false);
  if(editing){
    return(
      <EditPostForm post={post} 
      onUpdated={(p: Post)=>{
        onUpdated(p);
        setEditing(false);
      }}
      onCancel={()=>setEditing(false)}
      />
    );
  }


  return (
    <article className="post-card">
      <header>
        <h2>{title}</h2>
        {author ? <p className="meta">By {author}</p> : null}
        {formattedDate ? <p className="meta">Published {formattedDate}</p> : null}
      </header>
      {excerpt ? <p>{excerpt}</p> : null}
      <button onClick={()=>setEditing(true)}>Edit</button>
      <button onClick={async()=>{
        
      }}>Delete</button>
    </article>
  );
}

export default PostCard;
