import styled from "styled-components";
import Item from "../../../components/Item";
import { useEffect, useState } from "react";
import axios from "../../../services/axios";

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  padding: 1% 5%;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
    padding: 30px 0;
`;

const SectionTitle = styled.h2`
  font-weight: 600;
`;
interface Listing {
  id_listing: string;
  product: {
    name: string;
    description: string;
    images: string[];
    price: number;
    condition: string;
    verification_status: string;
  };
}


const PopularItems = () => {
    const [itemList, setItemList] = useState<Listing[]>([]);


  useEffect(() => {

    const fetchItems = async () => {
      try {
         const res = await axios.get("/listing");
          setItemList(res.data); 
      }
      catch (error: any) { console.error(error); }
    };

    fetchItems();
  }, []);

  return(
  <Section>
    <SectionTitle>Produits populaires</SectionTitle>
    <Grid>
      {Array.isArray(itemList) ? itemList
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(item => (
          <Item
            key={item.id_listing}
            id={item.id_listing}
            name={item.product.name}
            description={item.product.description}
            img={item.product.images?.[0]}
            price={item.product.price.toString()}
            condition={item.product.condition}
            verification={item.product.verification_status}
            variant="type2"
          />
        )):null}
    </Grid>
  </Section>
);}

export default PopularItems;
