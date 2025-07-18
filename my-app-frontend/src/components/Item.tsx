
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LazyImage from "./LazyImage";

export type ConditionState = 'Neuf'|'Bon état'|'Passable';
export type VerificationState = 'Reconditionné' | 'Occasion';

type ItemVariant = 'type1' | 'type2' ;
interface ItemProps {
  variant? :ItemVariant;
  id: string;
  name: string;
  description: string;
  img: string;
  price: string;
  condition: ConditionState;
  verification : VerificationState;
}

const Container = styled.div`
  width: 250px;
  min-width: 250px;
  height: 350px;
  background-color: var(--color1);
  border-radius: 6px;
  border: 1px solid var(--color4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.3s ease;
  color: var(--color5);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;


const InfoContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Description = styled.p`
  flex: 1;
  margin: 0;
  color: var(--color5);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.span`
  font-weight: bold;
`;
const TagContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ConditionTag = styled.span`
  color: var(--color3);
  text-transform: capitalize;
  font-style: italic;
`;
const VerificationTag = styled.span`
  color: var(--color5);
  text-transform: capitalize;
  font-style: italic;
`;
const Item: React.FC<ItemProps> = ({ variant = 'type1',id ,name, description, img, price, condition,verification }) => {
  
  const navigate = useNavigate();
  const handleClickItem =()=>{
    navigate(`/product/${id}`)
  }
  const formatVerification = (value: string): VerificationState => {
  switch (value) {
    case 'READY_TO_SELL':
      return 'Occasion';
    case 'RECONDITIONED':
      return 'Reconditionné';
    default:
      return 'Occasion';
  }
};

const formatCondition = (value: string): ConditionState => {
  switch (value) {
    case 'NEW':
      return 'Neuf'; 
    case 'GOOD':
      return 'Bon état';
    case 'USED':
      return 'Passable';
    default:
      return 'Bon état';
  }
};

  return (
    <Container onClick={handleClickItem}>
      <LazyImage width={"auto"} height={"200px"} src={img} alt={name} />
      <InfoContainer>
        <Title>{name}</Title>
        {variant === 'type1'&&(<Description>{description}</Description>)}        
        <Price>{price} €</Price>
        <TagContainer >
          <ConditionTag >{formatCondition(condition)}</ConditionTag>
          <VerificationTag >{formatVerification(verification)}</VerificationTag>
        </TagContainer>

      </InfoContainer>
    </Container>
  );
};

export default Item;
