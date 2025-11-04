
import styled from "styled-components";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {DropdownMenu} from "./DropdownMenu";
import axios from "../services/axios";
import { useCartContext } from "../hooks/useCartContext";
import gsap from "gsap";

interface HeaderProps {
  reduce?: boolean;
}
interface CategoryProps {
  id_category:string;
  name_category:string;
  text:string;
  img :string;  
}

const Spacer = styled.div`
    display:none;
    background-color: var(--color1); 
    width:100%;
  @media (max-width: 1023px) {
    display:flex;
    height: 96px;
  }
`;
const Spacer2 = styled.div`
    display:none;
    background-color: var(--color1); 
    width:100%;
  @media (max-width: 1023px) {
    display:flex;
    height: 48px;
  }
`;
const HeaderContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: column; 
    align-items: center; 
`;
const Header1 = styled.div`
    height:60px;
    width:100vw;
    padding:0 20px;
    gap:20px;
    display:flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between;
    background-color: var(--color1);  
    @media (max-width: 1023px) {
        position: fixed;
        top:0;
        height:48px;
        z-index: 1000;
    }
`;
const Header2 = styled.div`
    height:60px;
    width:100%;
    display:flex;
    flex-direction: row; 
    align-items: center; 
    background-color: var(--color1); 
     
    @media (max-width: 1023px) {
        position: fixed;
        top:48px;
        height:48px;
        justify-content:center;
        z-index: 1000;
    }

`;
const ListLink=styled.ul`
    list-style: none;
    display:flex;
    flex-direction:row;
    gap:10px;
    padding:10px; 
    @media (max-width: 1023px) {
       flex-direction:column;
    }          
`;
const LinkStyled = styled.li`
    color:var(--color5); 
    list-style:none;
    cursor: pointer;   
    &:hover{
        color:var(--color3); 
    }       
`;
const Header3 = styled.div`
    height:40px;
    width:100%;
    display:flex;
    justify-content:center;
    align-items: center; 
    background-color: var(--color3);           
`;
const OfferText = styled.p`
    color:var(--color5);     
`;
const SearchBarContainer = styled.div<{$display:boolean}>`
    
    display: ${({ $display }) => $display? "flex":"none"};
    width : 80%;
    max-width: 500px;
    height: 40px;
    border-radius: 6px;
    padding: 0 10px;
    background-color: var(--color5);
    align-items: center;
    justify-content: space-between;
    border: 2px solid transparent;
    transition: border 0.2s ease;

    &:focus-within {
        border-color: var(--color3); 
    }
    @media (max-width: 1023px) {
        display: ${({ $display }) => $display? "none":"flex"};
        height: 34px;
    }
`;
const DesktopLinks = styled(ListLink)`
  @media (max-width: 1023px) {
    display: none;
  }
`;
const SearchBar = styled.input`
    flex: 1;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--color1);
    font-size: 16px;

    &::placeholder {
        color: #aaa;
    }
`;


const IconBackground = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow:visible;
`;



const IndicatorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; 
  overflow: visible;
`;

const CartIndicatorStyle = styled.div`
  position: absolute;
  top: 5%;
  right : 5%;
  transform: translate(50%, -50%);
  background-color: var(--color3);
  color: var(--color2);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;

const Pulse = styled.div`
  position: absolute;
  top: 5%;
  right : 5%;
  transform: translate(50%, -50%); 
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color3);
  border: 2px solid var(--color3);
`;



const BurgerIcon = styled(FontAwesomeIcon)`
  color: var(--color5);
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 1023px) {
    display: block;
  }
`;
const MobileMenu = styled.div<{ open: boolean }>`
  //display: ${({ open }) => (open ? 'flex' : 'none')};
  position:fixed;
  top:96px;
  flex-direction: column;
  gap: 10px;
  background-color: var(--color1);
  width: 100%;
  z-index: 1000;

    max-height: ${({ open }) => (open ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  
  @media (min-width: 1023) {
    display: none;
  }
`;


const Header :React.FC<HeaderProps>  = ({reduce=false}) => {
    const [search,setSearch] =useState('')
    const { user, signOut } = useAuthContext();
    const {totalQuantity} =useCartContext();
    const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const pulseRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        fetchCategory();
    },[])
    const fetchCategory = async () => {
        try {
            const response = await axios.get("/category");
            setCategoryList(response.data);
        } catch (error: any) {
            console.error("fetchCategory error:", error.response?.data?.message || error.message);
        }
    };  

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleSearch = () => {
        navigate(`/catalog?search=${search}`);
    };

    const menuItems = user
    ? [
        { label: "Mon compte", onClick: () => navigate("/user/info") },
        ...(user?.role === 'ADMIN'
            ? [{ label: "Admin", onClick: () => navigate("/admin/users") }]
            : []),
        { label: "Se deconnecter", onClick: () => signOut() },
        ]
    : [
        { label: "Se connecter", onClick: () => navigate("/signin") },
        { label: "S'inscrire", onClick: () => navigate("/signup") },
    ];



useEffect(() => {
  if (pulseRef.current) {
    const pulses = pulseRef.current.querySelectorAll(".pulse");
    gsap.to(pulses, {
        scale: 1.6,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.5,
        ease: "power1.out",
        transformOrigin: "50% 50%"
    });
  }
}, [totalQuantity]);



    return (    
      <HeaderContainer> 
        {reduce?(
            <div style={{width:"100%"}}>
                <Spacer2 />
                <Header1 style={{justifyContent:'center'}}>
                    <Logo/>       
                </Header1>     
            </div>           
 
        ):(
            <>
                <Spacer />
                <Header1>
                     <BurgerIcon icon="bars" onClick={() => setMenuOpen(!menuOpen)} />
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px',}}>
                        <FontAwesomeIcon style={{display:'none'}} size="2x" icon="bars" color="#F6F6F6" />
                        <Logo/>
                    </div>

                    <SearchBarContainer $display={true}>
                        <SearchBar  type="text"  value={search}  onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Rechercher ..."/>
                        <FontAwesomeIcon size="1x" icon="search" color="#34374C" cursor="pointer" onClick={handleSearch} />
                    </SearchBarContainer>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px',overflow:'visible'}}>
                        <DropdownMenu
                            trigger={
                                <IconBackground>
                                <FontAwesomeIcon size="1x" icon="user" color='var(--color1)' />
                                </IconBackground>
                            }
                            items={menuItems}
                        />
                        <IconBackground style={{ position: "relative" }} onClick={() => navigate("/cart")}>
                            <FontAwesomeIcon  size="1x" icon="shopping-cart" color='var(--color1)' />
                            {totalQuantity > 0 && (
                            <IndicatorWrapper ref={pulseRef}>
                                <Pulse className="pulse" />
                                <Pulse className="pulse" />
                                <Pulse className="pulse" />
                                <CartIndicatorStyle>
                                    {totalQuantity}
                                </CartIndicatorStyle>
                            </IndicatorWrapper>

                            )}
                        </IconBackground>
                                
                    </div>            
                </Header1>       
                <Header2>
                    <SearchBarContainer $display={false}>
                        <SearchBar  type="text"  value={search}  onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Rechercher ..."/>
                        <FontAwesomeIcon size="1x" icon="search" color='var(--color1)' cursor="pointer" onClick={handleSearch} />
                    </SearchBarContainer>
                    <DesktopLinks>
                        <LinkStyled onClick={() => navigate("/catalog")}>Catalogue</LinkStyled>
                        {categoryList.map((category) => (
                        <LinkStyled key={category.id_category} onClick={() => navigate(`/catalog?category=${category.id_category}`)}>
                            {category.name_category}
                        </LinkStyled>
                        ))}
                    </DesktopLinks>
                </Header2>
                <Header3>
                    <OfferText>Livraison gratuite Dès 40€ sur tous les articles</OfferText>
                </Header3>
                <MobileMenu open={menuOpen}>
                    <ListLink>
                        <LinkStyled onClick={() => navigate("/catalog")}>Catalogue</LinkStyled>
                        {categoryList.map((category) => (
                            <LinkStyled key={category.id_category} onClick={() => {
                            navigate(`/catalog?category=${category.id_category}`);
                            setMenuOpen(false);
                            }}>
                            {category.name_category}
                            </LinkStyled>
                        ))}
                    </ListLink> 
                </MobileMenu>
            </>
        )}

      </HeaderContainer> 

    );
  };

  export default Header;