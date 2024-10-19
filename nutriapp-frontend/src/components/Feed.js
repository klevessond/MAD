import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CreatePost from './CreatePost';
import Post from './Post';

const FeedContainer = styled.div`
  padding: 20px;
`;

const FeedHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Buscar postagens do backend
    axios.get('http://localhost:8000/api/postagens-usuarios/')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Erro ao buscar postagens:', error));
  }, []);

  return (
    <FeedContainer>
      <FeedHeader>Home</FeedHeader>
      <CreatePost />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </FeedContainer>
  );
}

export default Feed;
