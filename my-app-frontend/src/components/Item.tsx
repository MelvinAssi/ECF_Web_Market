import styled from "styled-components";

export type ItemState = 'reconditionné' | 'Occasion';

interface ItemProps {
  name: string;
  description: string;
  img: string;
  price: string;
  state: ItemState;
}

const Container = styled.div`
  width: 250px;
  height: 400px;
  background-color: var(--color1);
  border-radius: 6px;
  border: 1px solid var(--color4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease;
  color: var(--color5);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImgContainer = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  width: 100%;
`;

const InfoContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
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

const StateTag = styled.span<{ state: ItemState }>`
  color: var(--color3);
  text-transform: capitalize;
  font-style: italic;
`;

const Item: React.FC<ItemProps> = ({ name, description, img, price, state }) => {
  return (
    <Container>
      <ImgContainer image={img} />
      <InfoContainer>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Price>{price}</Price>
        <StateTag state={state}>{state}</StateTag>
      </InfoContainer>
    </Container>
  );
};

export default Item;
