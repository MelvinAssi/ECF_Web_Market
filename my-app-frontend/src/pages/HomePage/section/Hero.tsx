import styled from "styled-components";
import { offer1, offer2, offer3 } from "../../../assets/img/HomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
  width: 100%;
  position: relative;
  background-color: var(--color2);
`;

const SlideWrapper = styled.div`
  width: 90%;
  max-width: 1298px;
  aspect-ratio: 1298 / 199;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  @media (max-width: 768px) { aspect-ratio: 2 / 1; }
`;

const Slide = styled.img<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
`;

const Chevron = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  color: var(--color1);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  &:hover { color: var(--color3); }
  &.left { left: 10px; }
  &.right { right: 10px; }
  @media (max-width: 768px) { font-size: 20px; padding: 6px; }
`;



const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [offer1, offer2, offer3];
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  return(
  <HeroSection>
    <Chevron icon={faChevronLeft} className="left" onClick={prevSlide} />
    <SlideWrapper>
      {carouselImages.map((img, index) => (
        <Slide key={index} src={img} $active={index === currentSlide} alt={img+' index'}/>
      ))}
    </SlideWrapper>
    <Chevron icon={faChevronRight} className="right" onClick={nextSlide} />
  </HeroSection>
);}

export default Hero;
