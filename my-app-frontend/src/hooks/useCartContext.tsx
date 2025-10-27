import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";


export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext doit être utilisé dans un CartProvider");
    }
    return context;
};