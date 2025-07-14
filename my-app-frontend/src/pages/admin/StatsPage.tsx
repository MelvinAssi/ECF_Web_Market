import styled from "styled-components";
import AdminLayout from "../../components/admin/AdminLayout";


const PageContainer = styled.div`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color :var(--color2);
`;

const StatsPage = () => {
  return (
    <AdminLayout>
        <PageContainer>
            <h1>Gestion des utilisateurs</h1>
        </PageContainer>
    </AdminLayout>
  );
};

export default StatsPage;
