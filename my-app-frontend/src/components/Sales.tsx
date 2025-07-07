import styled from "styled-components";
import Button from "../components/Button";

// Interface
interface Sale {
  id: string;
  date: string;
  total: string;
  status: string;
  buyerId: string;
}

// Styled Components
const SalesSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: var(--color5); // #F6F6F6
  border-radius: 6px;
`;

const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--color4); // #2C2E3E
`;

const Sales = ({ sales }: { sales: Sale[] }) => (
  <SalesSection>
    <h3 style={{ fontFamily: "Cormorant, serif", color: "#34374C" }}>Mes Ventes</h3>
    {sales.length > 0 ? (
      sales.map((sale) => (
        <SaleItem key={sale.id}>
          <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>
            Vente #{sale.id} - {sale.date} - {sale.total} - {sale.status}
          </p>
          <Button text="Détails" variant="type3" width="100px" type="button" onClick={() => {}} />
        </SaleItem>
      ))
    ) : (
      <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: "16px" }}>Aucune vente disponible.</p>
    )}
  </SalesSection>
);

export default Sales;