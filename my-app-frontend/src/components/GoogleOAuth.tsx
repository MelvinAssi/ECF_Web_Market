import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuthContext } from "../hooks/useAuthContext";

interface GoogleOAuthProps {
  setSucces: (success: boolean) => void;
  type:"signin"|"signup"
}

const GoogleOAuth = ({ setSucces,type }: GoogleOAuthProps) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
  const{oauthGoogle}=useAuthContext()

const handleSuccess = async (credentialResponse: CredentialResponse) => {
  const { credential } = credentialResponse;
  if (!credential) return setSucces(false);

  try {
    await oauthGoogle(credential);
    setSucces(true);
  } catch (error) {
    console.error("Erreur Google OAuth:", error);
    setSucces(false);
  }
};


  const handleError = () => {
    console.error("Échec de connexion Google");
    setSucces(false);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin type="standard" shape="rectangular" text={type === "signin" ? "signin_with" : "signup_with"}  onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;
