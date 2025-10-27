import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface CategoryProps {
  id_category: string;
  text: string;
  img: string;
}
interface ImgProps {
  $fetchPriority?: "high" | "low" | "auto";
}

const CategoryContainer = styled.div`
  width: 300px;
  height: 345px;
  background-color: var(--color1);
  border-radius: 12px;
  border: 1px solid var(--color4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  cursor: pointer;
`;

const CategoryImg = styled.img<ImgProps>`
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
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
  font-weight: 600;
  transition: color 0.3s ease;
`;

const CategoryItem: React.FC<CategoryProps> = ({ id_category, text, img }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    const imgEl = imgRef.current;
    if (!el || !imgEl) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(el, { y: -10, scale: 1.03, boxShadow: "0 6px 18px rgba(0,0,0,0.3)", duration: 0.3, ease: "power2.out" });
    tl.to(imgEl, { scale: 1.05, duration: 0.3, ease: "power2.out" }, "<");

    el.addEventListener("mouseenter", () => tl.play());
    el.addEventListener("mouseleave", () => tl.reverse());

    return () => {
      el.removeEventListener("mouseenter", () => tl.play());
      el.removeEventListener("mouseleave", () => tl.reverse());
    };
  }, []);

  return (
    <CategoryContainer
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/catalog?category=${id_category}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/catalog?category=${id_category}`)}
    >
      <CategoryImg ref={imgRef} src={img} alt={text} loading="eager"   $fetchPriority="high" />
      <CategoryTextContainer>
        <CategoryText>{text}</CategoryText>
      </CategoryTextContainer>
    </CategoryContainer>
  );
};

export default CategoryItem;
