
import styled from "styled-components";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";





const Header = () => {
    const [search,setSearch] =useState()
  
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
        @media (max-width: 768px) {
            height:48px;
        }
    `;
    const Header2 = styled.div`
        height:60px;
        width:100%;
        display:flex;
        flex-direction: column; 
        align-items: center; 
        background-color: var(--color1);  
        @media (max-width: 768px) {
            height:48px;
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
      font-size:24px;      
    `;
    const SearchBarContainer = styled.div`
        width: 500px;
        height: 40px;
        border-radius: 6px;
        padding: 0 10px;
        background-color: var(--color5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 2px solid transparent;
        transition: border 0.2s ease;

        &:focus-within {
            border-color: var(--color3); 
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
          
    `;




    return (    
      <HeaderContainer> 
        <Header1>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px'}}>
                <FontAwesomeIcon size="2x" icon="bars" color="#F6F6F6" />
                <Logo/>
            </div>
            <SearchBarContainer>
                <SearchBar type="text" value={search} onChange={()=>setSearch}/>
                <FontAwesomeIcon size="1x" icon="search" color="#34374C" />
            </SearchBarContainer>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px'}}>
                <IconBackground>
                    <FontAwesomeIcon size="1x" icon="shopping-cart" color="#34374C" />
                </IconBackground>
                <IconBackground>
                    <FontAwesomeIcon size="1x" icon="user" color="#34374C" />
                </IconBackground>                 
            </div>            
        </Header1>       
        <Header2>
        
        </Header2>
        <Header3>
            <OfferText>Livraison gratuite Dès 40€ sur tous les articles</OfferText>
        </Header3>
      </HeaderContainer> 

    );
  };

  export default Header;