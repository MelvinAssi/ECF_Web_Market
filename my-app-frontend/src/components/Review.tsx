import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

const ReviewList = [
  {
    id: 1,
    user: "Damien C.",
    text: "Commande reçue en 48h, très bon état, vraiment satisfait !",
    star: 5,
  },
  {
    id: 2,
    user: "Léa B.",
    text: "J’ai pu équiper mon bureau avec du reconditionné à prix mini. Merci !",
    star: 4,
  },
    {
    id: 3,
    user: "Damien C.",
    text: "Commande reçue en 48h, très bon état, vraiment satisfait !",
    star: 5,
  },
  {
    id: 4,
    user: "Léa B.",
    text: "J’ai pu équiper mon bureau avec du reconditionné à prix mini. Merci !",
    star: 4,
  },
    {
    id: 5,
    user: "Damien C.",
    text: "Commande reçue en 48h, très bon état, vraiment satisfait !",
    star: 5,
  },
  {
    id: 6,
    user: "Léa B.",
    text: "J’ai pu équiper mon bureau avec du reconditionné à prix mini. Merci !",
    star: 4,
  },
    {
    id: 7,
    user: "Damien C.",
    text: "Commande reçue en 48h, très bon état, vraiment satisfait !",
    star: 5,
  },
  {
    id: 8,
    user: "Léa B.",
    text: "J’ai pu équiper mon bureau avec du reconditionné à prix mini. Merci !",
    star: 4,
  },
];

interface Review {
  id: number;
  user: string;
  text: string;
  star: number;
}

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      setReviews(ReviewList);
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
    }
  };

  return (
    <ReviewContainer>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <TitleCard>
            <strong>{review.user}</strong>
          </TitleCard>
          <ReviewText>{review.text}</ReviewText>
          <StarContainer>
            {Array.from({ length: 5 }).map((_, i) => (

              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{
                    color: i < review.star ? 'var(--color3)' : 'rgba(238, 43, 71, 0.5)',
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
