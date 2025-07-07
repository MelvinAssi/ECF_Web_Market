import { createContext, useState, useEffect, type ReactNode, type ReactElement } from 'react';
import axios from "../services/axios";
import { useAuthContext } from "../hooks/useAuthContext";

// Typage du User
type User = {
  id_user: string;
  email: string;
  name: string;
  firstname: string;
  adress: string;
  phone: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
} | null;

type UserContextType = {
  userData: User;
  isLoading: boolean;
  fetchUserData: () => Promise<User | undefined>;
  updateUserData: (
    password: string,
    newPassword?: string,
    newName?: string,
    newFirstname?: string,
    newAdress?: string,
    newPhone?: string
  ) => Promise<void>;
  deleteUser: (password: string) => Promise<boolean>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = (props: { children: ReactNode }): ReactElement => {
  const [userData, setUserData] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const response = await axios.get('/user', {
            headers: { Authorization: `Bearer ${user.id_user}` },
          });
          setUserData(response.data.user);
        } catch (err) {
          console.error('fetchUserData failed', err);
          setUserData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/user' );
      setUserData(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error('fetchUserData failed', err);
      return undefined;
    }
  };

  const updateUserData = async (
    password: string,
    newPassword?: string,
    newName?: string,
    newFirstname?: string,
    newAdress?: string,
    newPhone?: string
  ) => {
    try {
      const response = await axios.put('/user', {
        password,
        newPassword,
        newName,
        newFirstname,
        newAdress,
        newPhone,
      });
      setUserData(response.data.user);
    } catch (err) {
      console.error('updateUserData failed', err);
      throw err;
    }
  };

  const deleteUser = async (password: string) => {
    try {
      await axios.delete('/user', {
        data: { password },
      });
      setUserData(null);
      return true;
    } catch (err) {
      console.error('deleteUser failed', err);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        fetchUserData,
        updateUserData,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider };