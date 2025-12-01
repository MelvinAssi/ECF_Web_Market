import styled from "styled-components";
import CategoryItem from "../../../components/CategoryItem";
import axios from "../../../services/axios";
import { useEffect, useState } from "react";
import {category1, category2, category3, category4 } from "../../../assets/img/HomePage";

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  padding: 1% 5%;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  align-items: start;
  padding: 30px 5px;
  width: 100%;
  overflow-x: auto; 
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; 
  }
`;


const SectionTitle = styled.h2`
  font-weight: 600;
`;

const PopularCategories = () => {
  const [categoryIds, setCategoryIds] = useState<Record<string, string>>({});

  const categoryImages: Record<string, string> = {
    "Ordinateurs portables": category1,
    "Smartphones": category2,
    "Accessoires": category3,
    "Composants PC": category4,
  };


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/category"); 
      const popularNames = ["Ordinateurs portables", "Smartphones", "Accessoires", "Composants PC"]; 
      if(!data || !Array.isArray(data)) {
        // Handle unexpected data format
        console.log("axios response :", await axios.get("/category"));
        console.log("Unexpected data format:", data);
        return;
      }
      const popularCategories = data.filter((cat: any) => popularNames.includes(cat.name_category));
      const mapped: Record<string, string> = {};
      popularCategories.forEach((cat: any) => {
        mapped[cat.name_category] = cat.id_category;
      });
      setCategoryIds(mapped);
    } catch (err) {
      console.error(err);
    }
  };
  fetchCategories();
}, []);

  return(
  <Section>
    <SectionTitle>Catégories populaires</SectionTitle>
    <CategoryGrid>
      {Object.entries(categoryIds).map(([name, id]) => (
        <CategoryItem key={id} id_category={id} text={name} img={categoryImages[name]} />
      ))}
    </CategoryGrid>
  </Section>
);}

export default PopularCategories;
