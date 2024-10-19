import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Search, Bell, Mail, User } from '@styled-icons/feather';

const SidebarContainer = styled.nav`
  width: 250px;
  padding: 20px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #14171a;
  text-decoration: none;
  font-size: 18px;
  
  &:hover {
    background-color: #e8f5fe;
    border-radius: 30px;
  }
`;

const Icon = styled.div`
  margin-right: 20px;
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <NavItem to="/">
        <Icon><Home size={24} /></Icon>
        Home
      </NavItem>
      <NavItem to="/explore">
        <Icon><Search size={24} /></Icon>
        Explorar
      </NavItem>
      <NavItem to="/notifications">
        <Icon><Bell size={24} /></Icon>
        Notificações
      </NavItem>
      <NavItem to="/messages">
        <Icon><Mail size={24} /></Icon>
        Mensagens
      </NavItem>
      <NavItem to="/profile">
        <Icon><User size={24} /></Icon>
        Perfil
      </NavItem>
    </SidebarContainer>
  );
}

export default Sidebar;
