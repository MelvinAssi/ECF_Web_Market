import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUsers,
  faBox,
  faTags,
  faThList,
  faShoppingCart,
  faExchangeAlt,
  faCommentDots,
  faEnvelope,
  faChartBar,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSidebarState } from "../../hooks/useSidebarState";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useIsMobile } from "../../hooks/useIsMobile";



const SideBar = styled.aside<{ $reduce: boolean }>`
    grid-area: sidebar;
    background-color: var(--color4);
    padding: 1em;
    border-right: 1px solid var(--color2);
    min-width: ${(props) => (props.$reduce ? "60px" : "200px")};
    transition: min-width 0.3s ease;
    height: 100%;
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
`;
const Label = styled.span<{ $reduce: boolean }>`
    display: ${({ $reduce }) => ($reduce ? "none" : "inline")};
`;




const ToggleItem = styled.li<{ $reduce: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $reduce }) => ($reduce ? "center" : "space-between")};
  padding: 10px;
  gap: 10px;
  color: var(--color5);
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: var(--color3);
  }

`;

const SidebarItem = styled.li<{ $reduce: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$reduce ? "center" : "flex-start")};
    gap: ${(props) => (props.$reduce ? "0" : "10px")};
    padding: 10px;
    height: 40px;
    cursor: pointer;
    color: var(--color5);
    transition: background 0.2s, gap 0.2s, justify-content 0.2s;
    border-radius: 6px;
     overflow: hidden;
    &:hover {
      background-color: var(--color3);
    }
`;


const Sidebar = () => {
    const isMobile = useIsMobile();
    const [reduce, setReduce] = useSidebarState();
    const effectiveReduce = isMobile ? true : reduce;
    const { signOut } = useAuthContext();
    const navigate =useNavigate();

    const navItems = [
        { label: "Utilisateurs", icon: faUsers, path: "/admin/users" },
        { label: "Produits", icon: faBox, path: "/admin/products" },
        { label: "Annonces", icon: faThList, path: "/admin/listings" },
        { label: "Catégories", icon: faTags, path: "/admin/categories" },
        { label: "Commandes", icon: faShoppingCart, path: "/admin/orders" },
        { label: "Transactions", icon: faExchangeAlt, path: "/admin/transactions" },
        { label: "Avis", icon: faCommentDots, path: "/admin/reviews" },
        { label: "Contacts", icon: faEnvelope, path: "/admin/contacts" },
        { label: "Statistiques", icon: faChartBar, path: "/admin/stats" },
    ];

  return (
    <SideBar $reduce={effectiveReduce}>
        <ul>
            {!isMobile && (
            <ToggleItem $reduce={effectiveReduce} onClick={() => setReduce(prev => !prev)}>
                <Label $reduce={effectiveReduce}>Admin</Label>
                <FontAwesomeIcon icon={effectiveReduce ? faChevronRight : faChevronLeft} />
            </ToggleItem>
            )}
            {navItems.map(({ label, icon, path }) => (
                <SidebarItem key={path} onClick={() => navigate(path)} $reduce={reduce}>
                    <FontAwesomeIcon icon={icon} />
                    <Label $reduce={effectiveReduce}>{label}</Label>
                </SidebarItem>
            ))}
                <SidebarItem  onClick={signOut} $reduce={effectiveReduce}>
                    <FontAwesomeIcon icon={faPowerOff} />
                    <Label $reduce={effectiveReduce}>Déconnexion</Label>
                </SidebarItem>
        </ul>
    </SideBar>
  );
};

export default Sidebar;
