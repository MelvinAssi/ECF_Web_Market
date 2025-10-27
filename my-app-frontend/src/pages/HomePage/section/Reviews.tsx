import styled from "styled-components";
import Review from "../../../components/Review";

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  padding: 10px;
  color: var(--color4);
  padding: 1% 5%;
`;

const Reviews = () => (
  <Section>
    <h2>Avis :</h2>
    <Review />
  </Section>
);

export default Reviews;
