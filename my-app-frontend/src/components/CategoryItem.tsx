import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategoryProps {
  id_category:string;
  text:string;
  img :string;  
}



const CategoryContainer = styled.div`
  width: 300px;
  height: 345px;
  background-color: var(--color1);
  border-radius: 6px;
  border: 1px solid var(--color4);
  display: flex;
  flex-direction: column;
`;

const CategoryImg = styled.img`
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
`;

const CategoryTextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.p`
  text-align: center;
  color: var(--color5);
`;


const CategoryItem : React.FC<CategoryProps> = ({ id_category,text, img}) =>{
    const navigate = useNavigate();
    return(
        <CategoryContainer
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/catalog?category=${id_category}`)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/catalog?category=${id_category}`)}
          >
            <CategoryImg   
              src={img}
              alt={text}
              loading="eager"
              fetchPriority="high" />
            <CategoryTextContainer>
                <CategoryText>{text}</CategoryText>
            </CategoryTextContainer>
        </CategoryContainer>
    )
}
export default CategoryItem;