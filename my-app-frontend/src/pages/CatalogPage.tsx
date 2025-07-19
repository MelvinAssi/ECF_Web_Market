import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../services/axios";
import Item from "../components/Item";
import DualRangeSlider from "../components/DualRangeSlider";

const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color2);
  padding: 10px;
`;

const CatalogContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  gap:20px;
  padding: 20px;
`;

const FilterContainer = styled.div`
  min-width: 340px;
  display: flex;
  flex-direction: column;
  background-color: var(--color5);
  padding: 20px;
  gap: 20px;
  border-radius: 6px;
`;
const GridContainer = styled.div`
  display: flex;
  min-width: 300px;
  flex:1;
  background-color: var(--color5);
  border-radius: 6px;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;
const LabelSelect = styled.label`
  display: flex;
  flex-direction: column;
`;
const StyledSelect = styled.select`
  width:auto;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
  border: 1px solid var(--color4);;
  background-color: var(--color2);
  color: var(--color4);
`;
const RadioButtonContainer =styled.fieldset`
  display:flex;
  flex-direction: column;
  padding: 10px;
  color : var(--color4);
`;

const RadioButton =styled.input`
  accent-color:var(--color3);

`;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search")?.toLowerCase() || "";

  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [filters, setFilters] = useState({
    category: categoryParam,
    minPrice: 0,
    maxPrice: 3000,
    condition: 'ALL',
    verification: 'ALL'
  });

  
  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search")?.toLowerCase() || "";

    setFilters(prev => ({
      ...prev,
      category
    }));

    setSearchQuery(search);
  }, [searchParams]);


  const fetchItems = async () => {
    try {
      const response = await axios.get("/listing");
      const filter1 =response.data.filter((listing)=>(listing.status=='ONLINE'))
      const filter2 = filter1.filter((listing)=>(listing.product.status =='RECONDITIONED'|| 'READY_TO_SELL'))
      setItemList(filter2);
      
    } catch (error: any) {
      console.error("fetchItems error:", error.response?.data?.message || error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/category");
      setCategoryList(response.data);
    } catch (error: any) {
      console.error("fetchCategory error:", error.response?.data?.message || error.message);
    }
  };

  const applyFilters = () => {
    const result = itemList.filter(item => {
      const price = parseFloat(item.product.price);

      const matchCategory = !filters.category || item.product.category_id === filters.category;
      const matchPrice = price >= filters.minPrice && price <= filters.maxPrice;
      const matchSearch = !searchQuery || item.product.name.toLowerCase().includes(searchQuery);
      const matchCondition = filters.condition === 'ALL' || item.product.condition === filters.condition;
      const matchVerification = filters.verification === 'ALL' || item.product.verification_status === filters.verification;

      return matchCategory && matchPrice && matchSearch && matchCondition && matchVerification;
    });

    setFilteredItems(result);
  };

  useEffect(() => {
    fetchItems();
    fetchCategory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, itemList]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const ConditionOptions = [
    ['ALL', 'Tous'],
    ['NEW', 'Neuf'],
    ['GOOD', 'Bon état'],
    ['USED', 'Passable']
  ];

  const VerificationOptions = [
    ['ALL', 'Tous'],
    ['READY_TO_SELL', 'Occasion'],
    ['RECONDITIONED', 'Reconditionné']
  ];

  return (
    <>
      <Header />
      <PageContainer>
        <h1>Catalogue</h1>
        <CatalogContainer>
          <FilterContainer>
            <LabelSelect htmlFor="category">
              Catégorie :
              <StyledSelect
                id="category"
                value={filters.category}
                onChange={handleCategoryChange}
              >
                <option value=''>Toutes</option>
                {categoryList.map((category) => (
                  <option key={category.id_category} value={category.id_category}>
                    {category.name_category}
                  </option>
                ))}
              </StyledSelect>
            </LabelSelect>

            <DualRangeSlider
              min={0}
              max={3000}
              onChange={(min, max) => {
                setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
              }}
            />

            <RadioButtonContainer>
              <legend>État cosmétique</legend>
              {ConditionOptions.map(([value, label]) => (
                <label key={value}>
                  <RadioButton
                    type="radio"
                    name="condition"
                    value={value}
                    checked={filters.condition === value}
                    onChange={() => setFilters(prev => ({ ...prev, condition: value }))}
                  />
                  {label}
                </label>
              ))}
            </RadioButtonContainer>

            <RadioButtonContainer>
              <legend>Disponibilité</legend>
              {VerificationOptions.map(([value, label]) => (
                <label key={value}>
                  <RadioButton
                    type="radio"
                    name="verification"
                    value={value}
                    checked={filters.verification === value}
                    onChange={() => setFilters(prev => ({ ...prev, verification: value }))}
                  />
                  {label}
                </label>
              ))}
            </RadioButtonContainer>
          </FilterContainer>
          <GridContainer>
            <Grid>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <Item
                    variant="type2"
                    key={item.id_listing}
                    id={item.id_listing}
                    name={item.product.name}
                    description={item.product.description}
                    img={item.product.images[0]}
                    price={item.product.price}
                    condition={item.product.condition}
                    verification={item.product.verification_status}
                  />
                ))
              ) : (
                <p style={{ color: "var(--color4)" }}>Aucun produit trouvé.</p>
              )}
            </Grid>
          </GridContainer>

        </CatalogContainer>
      </PageContainer>
    </>
  );
};

export default CatalogPage;
