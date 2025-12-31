import type { Post } from '../types/post';
import PostCard from './PostCard';

type PostListProps = {
  posts: Post[];
  onUpdated: (post:Post)=>void;
};

function PostList({ posts, onUpdated }: PostListProps): JSX.Element {
  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdated={onUpdated} onDeleted={function (id: Number): void {
          throw new Error('Function not implemented.');
        } }/>
      ))}
    </div>
  );
}

export default PostList;
