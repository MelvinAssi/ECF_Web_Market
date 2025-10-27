import { createContext, useState, useEffect, type ReactNode, type ReactElement } from "react";
import axios from "../services/axios";
import { useAuthContext } from "../hooks/useAuthContext";

interface CartItem {
  id_listing: string;
  quantity: number;
  product: {
    name: string;
    price: string;
    images?: string[];
  };
}

interface Cart {
  id: string;
  listings: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (listingId: string, quantity?: number) => Promise<void>;
  deleteCartItem: (listingId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkPresenceInCart: (listingId: string) => boolean;
  totalQuantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user,isLoading : userLoading } = useAuthContext();

  //Charger le panier dès que l'utilisateur change
  useEffect(() => {
    if (userLoading) return;
    console.log("User changed in CartContext :", user);
    if (user) {
      fetchCart();
    } else {
      setCart(null);
      setIsLoading(false);
    }
  }, [user, userLoading]);

  // Charger le panier depuis le backend
  const fetchCart = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await axios.get("/cart"); 
      const data = response.data;

      // reformater la réponse
      const formattedCart: Cart = {
        id: data.cartId,
        listings: data.listings?.listings || [],
      };

      setCart(formattedCart);
    } catch (err) {
      console.error("fetchCart failed", err);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Ajouter un article
  const addToCart = async (listingId: string, quantity: number = 1) => {
    try {
      await axios.post("/cart/add", { listingId, quantity });
      await fetchCart();
    } catch (error: any) {
      console.error("addToCart error:", error.response?.data?.message || error.message);
    }
  };

  // Supprimer un article
  const deleteCartItem = async (listingId: string) => {
    try {
      await axios.delete(`/cart/remove/${listingId}`);
    } catch (error: any) {
      console.error("deleteCartItem error:", error.response?.data?.message || error.message);
    } finally {
      await fetchCart();
    }
  };

  // Vider le panier
  const clearCart = async () => {
    try {
      await axios.delete("/cart/clear");
    } catch (error: any) {
      console.error("clearCart error:", error.response?.data?.message || error.message);
    } finally {
      await fetchCart();
    }
  };

  // Vérifier si un article est déjà dans le panier
  const checkPresenceInCart = (listingId: string): boolean => {
    return cart?.listings?.some((item) => item.id_listing === listingId) ?? false;
  };

  // Nombre total d’articles dans le panier
  const totalQuantity =
    cart?.listings?.reduce((acc, item) => acc + (item.quantity||1), 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        fetchCart,
        addToCart,
        deleteCartItem,
        clearCart,
        checkPresenceInCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
