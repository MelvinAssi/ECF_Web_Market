import { createContext, useState, useEffect, type ReactNode, type ReactElement } from 'react';
import axios from "../services/axios";


type User = {
  id_user: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
} | null;


type SignInResponse = {
  user: User;
};

type SignUpResponse = {
  user: User;
};

type checkEmailExistenceResponse = {
  exists: boolean;
};

type CheckEmailAvailabilityResponse = {
  available: boolean;
};


type AuthContextType = {
  user: User;
  isLoading: boolean;
  signIn: (email: string, password: string, recaptchaToken: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, firstname: string, adress: string, phone: string, recaptchaToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkEmailExistence: (email: string) => Promise<boolean>;
  checkEmailAvailability: (email: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("test") 
        const response = await axios.get('/auth/me');
        
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

const signIn = async (email: string, password: string, recaptchaToken: string): Promise<void> => {
    try {
      const response = await axios.post<SignInResponse>("/auth/signin", {
        email,
        password,
        recaptchaToken, 
      });
      setUser(response.data.user);
    } catch (error: any) {
      console.error("signIn error:", error.response?.data?.message || error.message);
      throw error; 
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    firstname: string,
    adress: string,
    phone: string,
    recaptchaToken: string
  ): Promise<void> => {
    try {
      const response = await axios.post<SignUpResponse>('/auth/signup', {
        email,
        password,
        name,
        firstname,
        adress,
        phone,
        recaptchaToken,
      });
      setUser(response.data.user);
    } catch (error: any) {
      console.error('signUp error:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await axios.post('/auth/signout');
      setUser(null);
    } catch (err) {
      console.error('signOut failed', err);
    }
  };

  const checkEmailExistence = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post<checkEmailExistenceResponse>('/auth/check-email-existence', { email });      
      return response.data.exists;
    } catch (err) {
      console.error('checkEmailExistence failed', err);
      return false;
    }
  };

  const checkEmailAvailability = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post<CheckEmailAvailabilityResponse>('/auth/check-email-availability', { email });
      return response.data.available;
    } catch (err) {
      console.error('checkEmailAvailability failed', err);
      return false;
    }
  };

  

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        checkEmailExistence,
        checkEmailAvailability,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
