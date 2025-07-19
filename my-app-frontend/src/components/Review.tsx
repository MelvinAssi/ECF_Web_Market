import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../services/axios"; 

// --- Styled Components ---
const ReviewContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  scroll-snap-type: x mandatory;
  gap: 16px;
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  width: 200px;
  min-width: 200px;
  background-color: var(--color1);
  border-radius: 6px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  color: var(--color5);
  overflow-y: hidden;
  transition: all 0.3s ease;
`;

const TitleCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: var(--color4);
`;

const ReviewText = styled.p`
  text-align: center;
  padding: 5px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  gap: 10px;
  color: var(--color3);
`;

interface Review {
  id: string;
  user: User;
  text: string;
  star: number;
}
interface User{
  name:string;
  firstname:string
}

const shuffleAndLimit = <T,>(arr: T[], count: number): T[] => {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
};

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get("/review"); 
      const allReviews: Review[] = res.data;
      const randomReviews = shuffleAndLimit(allReviews, 10);
      setReviews(randomReviews);
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
    }
  };
  const formatUserDisplayName=(firstname: string, name: string): string =>{
    const formattedFirstname = firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
    const firstLetterName = name.charAt(0).toUpperCase();
    return `${formattedFirstname} ${firstLetterName}.`;
  }

  return (
    <ReviewContainer>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <TitleCard>
            <strong>{formatUserDisplayName(review.user.firstname, review.user.name)}</strong>
          </TitleCard>
          <ReviewText>{review.text}</ReviewText>
          <StarContainer>
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{
                  color: i < review.star ? "var(--color3)" : "rgba(238, 43, 71, 0.5)",
                }}
              />
            ))}
          </StarContainer>
        </ReviewCard>
      ))}
    </ReviewContainer>
  );
};

export default Review;
