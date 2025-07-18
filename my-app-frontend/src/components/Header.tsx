
import styled from "styled-components";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {DropdownMenu} from "./DropdownMenu";
import axios from "../services/axios";

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
const HeaderContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: column; 
    align-items: center; 
`;
const Header1 = styled.div`
    height:60px;
    width:100%;
    padding:0 20px;
    gap:20px;
    display:flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between;
    background-color: var(--color1);  
    @media (max-width: 1023px) {
        position: fixed;
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
    width:32px;
    height:32px;
    border-radius: 50%;
    background-color:var(--color5);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
        
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
    const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    
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



    return (    
      <HeaderContainer> 
        {reduce?(
            <Header1 style={{justifyContent:'center'}}>
                <Logo/>       
            </Header1>      
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
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px'}}>
                        <DropdownMenu
                            trigger={
                                <IconBackground>
                                <FontAwesomeIcon size="1x" icon="user" color="#34374C" />
                                </IconBackground>
                            }
                            items={menuItems}
                        />
                        <IconBackground onClick={() => navigate("/cart")}>
                            <FontAwesomeIcon size="1x" icon="shopping-cart" color="#34374C" />
                        </IconBackground>
                                
                    </div>            
                </Header1>       
                <Header2>
                    <SearchBarContainer $display={false}>
                        <SearchBar  type="text"  value={search}  onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} placeholder="Rechercher ..."/>
                        <FontAwesomeIcon size="1x" icon="search" color="#34374C" cursor="pointer" onClick={handleSearch} />
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