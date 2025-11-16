import styled from "styled-components";
import UserLayout from "../../components/user/UserLayout";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../services/axios";
import Button from "../../components/Button";
import AddListingModal from "../../components/user/AddListingModal";
import { useNavigate } from "react-router-dom";

interface Listing {
  id_listing: string;
  status: string;
  publication_date: string;
  product_id:string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    condition: string;
    verification_status: string;
    images: string[];
  };
}

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: var(--color2);
`;

const ListingsSection = styled.section`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  background-color: var(--color5);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;   
  align-items: center;
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 30px;
  text-align: center;
`;

const ListingItem = styled.div`
  border-bottom: 1px solid var(--color4);
  padding: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:last-child {
    border-bottom: none;
  }
`;

const ListingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    margin: 0;
    color: var(--color1);
  }

  .name {
    font-weight: bold;
    color: var(--color3);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ListingActions = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: var(--color1);
`;

const UserListingsPage = () => {
  const { user } = useAuthContext();
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("/listing/user");
      console.log(res.data)
      setListings(res.data || []);
    } catch (err) {
      setError("Erreur lors du chargement des annonces.");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete("/product", { data: { id: productId } });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  


  return (
    <UserLayout>
      <PageWrapper>
        <ListingsSection>
          <PageTitle>Mes Annonces</PageTitle>
          {user?.role == "BUYER" ? (<p> Devenir vendeur : allez dans vos informations</p>):
          (<>
            <Button
              text="Ajouter une annonce"
              variant="type3"
              width="300px"
              type="button"
              onClick={() => setIsModalOpen(true)}
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {listings.length > 0 ? (
              listings.map((listing) => (
                <ListingItem key={listing.id_listing}>
                  <ListingInfo>
                    <p
                      className="name"
                      onClick={() => navigate(`/product/${listing.id_listing}`)}
                    >
                      {listing.product.name}
                    </p>
                    <p>Description : {listing.product.description}</p>
                    <p>Prix : {parseFloat(listing.product.price).toFixed(2)} €</p>
                    <p>État : {listing.product.condition}</p>
                    <p>Status : {listing.status}</p>
                    <p>Date : {formatDate(listing.publication_date)}</p>
                  </ListingInfo>

                  {listing.status !== "SOLD" && (
                    <ListingActions>
                      <Button
                        text="Modifier"
                        variant="type3"
                        width="120px"
                        type="button"
                        onClick={() =>
                          navigate(`/user/products/${listing.product_id}`)
                        }
                      />
                      <Button
                        text="Supprimer"
                        variant="type2"
                        width="120px"
                        type="button"
                        onClick={() => handleDelete(listing.product.id)}
                      />
                    </ListingActions>
                  )}

                </ListingItem>
              ))
            ) : (
              <EmptyMessage>Aucune annonce disponible.</EmptyMessage>
            )}
          
          
          </>)}
          

          <AddListingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchData}
          />
        </ListingsSection>
      </PageWrapper>
    </UserLayout>
  );
};

export default UserListingsPage;
