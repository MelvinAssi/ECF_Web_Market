import { createContext, useState, useEffect, type ReactNode, type ReactElement } from 'react';
import axios from "../services/axios";

type User = {
    id_user: string;
    email: string;
    role: 'BUYER' | 'SELLER' | 'ADMIN';
} | null;

type AuthContextType = {
    user: User;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string,name:string,firstname:string,adress:string,phone:string) => Promise<void>;
    signOut: () => Promise<void>;
    checkEmailExistence: (email: string) => Promise<boolean>;
    checkEmailAvailability: (email: string) => Promise<boolean>;
};
export const AuthContext = createContext<AuthContextType| undefined>(undefined);


const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);
    const signIn = async (email:string,password:string) => {
      try {
        const response = await axios.post('/auth/signin', {
            email,
            password           
        });
        setUser(response.data.user);
        console.log(response.data.user)
        console.log(user)
      } catch (error:any) {
        console.error('signIn error:', error.response?.data?.message || error.message);
        throw error;
      }
    };

    const signUp = async (email:string,password:string, name:string,firstname:string,adress:string,phone:string) => {
      try {
        const response = await axios.post('/auth/signup', {
            email,password, name,firstname,adress,phone                      
        });
        setUser(response.data.user);
        console.log(response.data.user)
      } catch (error:any) {
        console.error('signUp error:', error.response?.data?.message || error.message);
        throw error;
      }
    };


    const signOut = async () => {
      try {
        await axios.post('/signout');
        setUser(null);
      } catch (err) {
        console.error('Logout failed', err);
      }
    };
    const checkEmailAvailability = async (email:string)=>{
        try {
            const response = await axios.post('/auth/check-email-availability', {
                email          
            });
            return response;
        } catch (err) {
            console.error('checkEmailAvailability failed', err);
            return false;
        }
    }

    const checkEmailExistence = async (email:string)=>{
        try {
            const response = await axios.post('/auth/check-email-existence', {
                email          
            });
            return response;
        } catch (err) {
            console.error('checkEmailExistence failed', err);
            return false;
        }
    }
    


    return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut,checkEmailExistence,checkEmailAvailability }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };