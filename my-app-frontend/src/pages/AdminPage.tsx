import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/admin/Sidebar";

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

const PageContainer = styled.main`
  grid-area: main;
  background-color: var(--color2);
  padding: 2em;
  overflow-y: auto;
`;

const AdminPage = () => {
  return (
    <Layout>
      <HeaderContainer>
        <Header reduce />
      </HeaderContainer>

      <Sidebar />

      <PageContainer>
        <h1>AdminPage</h1>
      </PageContainer>
    </Layout>
  );
};

export default AdminPage;
