import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUsers,
  faThList,
  faShoppingCart,
  faExchangeAlt,
  faCommentDots,
  faPowerOff,
  faStore
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSidebarState } from "../../hooks/useSidebarState";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useIsMobile } from "../../hooks/useIsMobile";

const SideBar = styled.aside<{ $reduce: boolean }>`
  grid-area: sidebar;
  background-color: var(--color4);
  padding: 0.5em;
  border-right: 1px solid var(--color2);
  transition: min-width 0.3s ease;
  height: 100%;
  ul {
      list-style: none;
      padding: 0;
      margin: 0;
  }
`;
const Label = styled.span<{ $reduce: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  opacity: ${({ $reduce }) => ($reduce ? 0 : 1)};
  width: ${({ $reduce }) => ($reduce ? "0px" : "auto")};
`;





const ToggleItem = styled.li<{ $reduce: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $reduce }) => ($reduce ? "center" : "space-between")};
  padding: 10px;
  gap: 10px;
  height: 40px;
  color: var(--color5);
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    background-color: var(--color3);
  }

`;

const SidebarItem = styled.li<{ $reduce: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left:50px;
  gap: ${(props) => (props.$reduce ? "0" : "10px")};
  padding: 10px;
  padding-left:13px;
  cursor: pointer;
  color: var(--color5);
  transition: background-color 0.2s, gap 0.2s, justify-content 0.2s;
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
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLSpanElement[]>([]);
  labelsRef.current = [];

  useEffect(() => {
    if (!sidebarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(sidebarRef.current, {
      width: effectiveReduce ? 60 : 210,
      duration: 0.4,
    });
    
    tl.to(labelsRef.current,{
      opacity: effectiveReduce ? 0 : 1,
      duration: 0.2,
    })

    return () => {
      tl.kill();
    }
  }, [effectiveReduce]);



  const navItems = [
    { label: "Mes Informations", icon: faUsers, path: "/user/info" },
    { label: "Mes Annonces", icon: faThList, path: "/user/listings" },
    { label: "Mes Commandes", icon: faShoppingCart, path: "/user/orders" },
    { label: "Mes Ventes", icon: faExchangeAlt, path: "/user/transactions" },
    { label: "Mon Avis", icon: faCommentDots, path: "/user/reviews" },
    { label: "Devenir vendeur", icon: faStore, path: "/user/become-seller" }
    
    
  ];

  return (
    <SideBar ref={sidebarRef} $reduce={effectiveReduce}>
      <ul>
        {!isMobile && (
          <ToggleItem $reduce={effectiveReduce} onClick={() => setReduce(prev => !prev)}>
            <Label $reduce={effectiveReduce}>User</Label>
            <FontAwesomeIcon icon={effectiveReduce ? faChevronRight : faChevronLeft} size="lg"/>
          </ToggleItem>
        )}
        {navItems.map(({ label, icon, path }) => (
          <SidebarItem key={path} onClick={() => navigate(path)} $reduce={effectiveReduce}>
            <FontAwesomeIcon icon={icon} />
            <Label  ref={(el) => {if (el)  labelsRef.current.push(el)}}  $reduce={effectiveReduce}>{label}</Label>
          </SidebarItem>
        ))}
        <SidebarItem onClick={signOut} $reduce={effectiveReduce}>
          <FontAwesomeIcon icon={faPowerOff} />
          <Label ref={(el) => {if (el)  labelsRef.current.push(el)}}  $reduce={effectiveReduce}>Déconnexion</Label>
        </SidebarItem>
      </ul>
    </SideBar>
  );
};


export default Sidebar;
