import { type ReactNode } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
`;

const HeaderContainer = styled.header`
  grid-area: header;
`;


const MainContainer = styled.main`
  grid-area: main;
  background-color: var(--color2);
  padding: 1em;
  overflow-y: auto;
`;

const SidebarContainer = styled.aside`
  grid-area: sidebar;
`;

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <HeaderContainer>
        <Header reduce />
      </HeaderContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>{children}</MainContainer>
    </Layout>
  );
};

export default UserLayout;
