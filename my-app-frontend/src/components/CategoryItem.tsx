import styled from 'styled-components';

interface CategoryProps {
  text:string;
  img :string;
}


type CategoryImgProps = {
  image: string;
};
const CategoryContainer = styled.div`
  width: 300px;
  height: 345px;
  background-color: var(--color1);
  border-radius: 6px;
  border: 1px solid var(--color4);
  display: flex;
  flex-direction: column;
`;

const CategoryImg = styled.div<CategoryImgProps>`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
  border-radius: 6px 6px 0 0;
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


const CategoryItem : React.FC<CategoryProps> = ({ text, img}) =>{

    return(
        <CategoryContainer>
            <CategoryImg image={img} />
            <CategoryTextContainer>
                <CategoryText>{text}</CategoryText>
            </CategoryTextContainer>
        </CategoryContainer>
    )
}
export default CategoryItem;