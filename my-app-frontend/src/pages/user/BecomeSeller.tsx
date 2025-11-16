
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import UserLayout from "../../components/user/UserLayout";
import styled from "styled-components";
import axios from "../../services/axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: var(--color2);
`;

const Section = styled.section`
    width: 100%;
    max-width: 1000px;
    padding: 30px;
    background-color: var(--color5);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const PageTitle = styled.h1`
  color: var(--color1);
  margin-bottom: 30px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: var(--color3);
  text-align: center;
`;

const BecomeSeller = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user,refreshToken} = useAuthContext();

    useEffect(() => {
        const refresh = async () => {
            try {
            await refreshToken();
            } catch (e) {
            console.error("Failed to refresh token", e);
            }
        };

    refresh();
    }, []);
    const handleBecomeSeller = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post("/payments/create-stripe-seller-account/");
            const { onboardingUrl } = res.data;
            if (!onboardingUrl) throw new Error("No onboarding URL returned");
            window.location.href = onboardingUrl;
        } catch (err: any) {
            console.error("Erreur BecomeSeller:", err);
            setError(err.response?.data?.error || err.message || "Erreur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserLayout>
            <PageWrapper>
                <Section>
                    <PageTitle>Devenir vendeur</PageTitle>
                    {user?.role === "SELLER" ? (
                        <p style={{ textAlign: "center" }}>
                            Votre compte vendeur est déjà activé. Vous pouvez commencer à   vendre vos produits !
                        </p>
                    ) : (
                        <>
                            <p style={{ textAlign: "center", maxWidth: "800px", lineHeight: "1.6" }}>
                                TechReuse utilise <strong>Stripe</strong>, un service sécurisé de paiement,
                                pour protéger les vendeurs et les acheteurs.
                                <br /><br />
                                Avant de recevoir vos paiements, Stripe vous demandera quelques
                                informations obligatoires pour vérifier votre identité, conformément
                                aux lois européennes (KYC).
                                <br /><br />
                                🔐 <strong>Prévoyez :</strong><br />
                                • votre téléphone pour la double authentification<br />
                                • votre IBAN pour recevoir vos virements<br />
                                <br /><br />
                                Une fois ces étapes complétées, votre compte vendeur sera activé.
                            </p>


                            <Button
                                text={loading ? "Redirection..." : "Activer mon compte vendeur"}
                                onClick={handleBecomeSeller}
                                disabled={loading}
                            />
                            {error && <ErrorMessage >{error}</ErrorMessage>}
                        </>
                    )}
                </Section>

            </PageWrapper>
        </UserLayout>

    );
};

export default BecomeSeller;