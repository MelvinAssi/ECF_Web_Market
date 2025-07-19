import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";

interface Sale {
  id_listing: string;
  publication_date: string;
  status: string;
  product: {
    name: string;
    price: string;
  };
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--color2);
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
`;

const SalesSection = styled.section`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  background-color: var(--color5);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const SaleItem = styled.div`
  border-bottom: 1px solid var(--color4);
  padding: 16px 0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    padding: 12px 0;
  }
`;

const SaleDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  p {
    margin: 0;
    color: var(--color1);
    font-size: 1rem;

    @media (max-width: 600px) {
      flex: 1 1 100%;
    }
  }
`;

const SaleTitle = styled.p`
  font-weight: bold;
  color: var(--color3);
`;

const ErrorMessage = styled.p`
  color: var(--color3);
  text-align: center;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  color: var(--color1);
  text-align: center;
`;

const UserTransactionsPage = () => {
  const { user } = useAuthContext();
  const [sales, setSales] = useState<Sale[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/listing/user");
        const sold = response.data.filter((sale) => sale.status === "SOLD");
        setSales(sold || []);
      } catch (err) {
        setError("Erreur lors du chargement des ventes.");
      }
    };

    fetchData();
  }, [user]);

  return (
    <UserLayout>
      <PageWrapper>
        <SalesSection>
          <PageTitle>Mes Ventes</PageTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {sales.length > 0 ? (
            sales.map((sale) => (
              <SaleItem key={sale.id_listing}>
                <SaleDetails>
                  <SaleTitle>{sale.product.name}</SaleTitle>
                  <p>Prix : {parseFloat(sale.product.price).toFixed(2)} €</p>
                  <p>Date : {new Date(sale.publication_date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
                  <p>Statut : {sale.status}</p>
                </SaleDetails>
              </SaleItem>
            ))
          ) : (
            <EmptyMessage>Aucune vente pour le moment.</EmptyMessage>
          )}
        </SalesSection>
      </PageWrapper>
    </UserLayout>
  );
};

export default UserTransactionsPage;
