import React from 'react';
import styled from 'styled-components';

const RightSidebarContainer = styled.aside`
  width: 300px;
  padding: 20px;
`;

const SidebarSection = styled.div`
  background-color: #f5f8fa;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

function RightSidebar() {
  return (
    <RightSidebarContainer>
      <SidebarSection>
        <SectionTitle>Quem seguir</SectionTitle>
        {/* Adicione sugestões de usuários para seguir */}
      </SidebarSection>
      <SidebarSection>
        <SectionTitle>Tópicos em alta</SectionTitle>
        {/* Adicione tópicos em alta */}
      </SidebarSection>
    </RightSidebarContainer>
  );
}

export default RightSidebar;
