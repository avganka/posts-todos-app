import {Heading, VStack} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import {useEffect, useState} from 'react';
import {api} from '../api/apiConfig';
import {API_ROUTES} from '../api/apiRoutes';
import {PostWithComments} from '../types';

function PostsPage() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await api.get<PostWithComments[]>(
        `${API_ROUTES.posts}?_embed=comments&_limit=10`
      );
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Heading as={'h1'} py={{base: 4, md: 8}}>
        Posts
      </Heading>
      <VStack spacing={10}>
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </VStack>
    </div>
  );
}

export default PostsPage;
