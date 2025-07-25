import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext doit être utilisé dans un UserProvider");
    }
    return context;
};