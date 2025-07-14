

import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";
import Button from "../../components/Button";

interface Sale {
  id: string;
  date: string;
  total: string;
  status: string;
  buyerId: string;
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--color2);
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 20px;
`;

const SalesSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5);
  border-radius: 6px;
`;

const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--color4);

  &:last-child {
    border-bottom: none;
  }

  p {
    color: var(--color1);
    margin: 0;
  }
`;

const UserTransactionsPage = () => {
  const { user } = useAuthContext();
  const [sales, setSales] = useState<Sale[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get("/listing/user");
        setSales(salesResponse.data.sales || []);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      }
    };
    fetchData();
  }, [user]);

  return (
    <UserLayout>
      <PageWrapper>
        <SalesSection>
          <PageTitle>Mes Transactions</PageTitle>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {sales.length > 0 ? (
            sales.map((sale) => (
              <SaleItem key={sale.id}>
                <p>
                  Vente #{sale.id} –{" "}
                  {new Date(sale.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  – {parseFloat(sale.total).toFixed(2)} € – {sale.status}
                </p>
                <Button
                  text="Détails"
                  variant="type3"
                  width="100px"
                  type="button"
                  onClick={() => {}}
                />
              </SaleItem>
            ))
          ) : (
            <p style={{ color: "var(--color1)" }}>Aucune vente disponible.</p>
          )}
        </SalesSection>
      </PageWrapper>
    </UserLayout>
  );
};

export default UserTransactionsPage;
