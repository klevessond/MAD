import React from 'react';
import styled from 'styled-components';
import { Heart, MessageCircle, Repeat } from '@styled-icons/feather';

const PostContainer = styled.div`
  border-bottom: 1px solid #e6ecf0;
  padding: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const PostContent = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #657786;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: #1da1f2;
  }
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostHeader>
        <Avatar src={post.autor_avatar || 'https://via.placeholder.com/48'} alt={post.autor_nome} />
        <UserName>{post.autor_nome}</UserName>
      </PostHeader>
      <PostContent>{post.conteudo}</PostContent>
      <PostActions>
        <ActionButton>
          <Heart size={18} />
          <span>Curtir</span>
        </ActionButton>
        <ActionButton>
          <MessageCircle size={18} />
          <span>Comentar</span>
        </ActionButton>
        <ActionButton>
          <Repeat size={18} />
          <span>Compartilhar</span>
        </ActionButton>
      </PostActions>
    </PostContainer>
  );
}

export default Post;
