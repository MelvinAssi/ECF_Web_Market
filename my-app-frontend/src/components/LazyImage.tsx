import { useState } from "react";
import styled from "styled-components";

const ImageWrapper = styled.div<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color5);
  border-radius: 6px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
  }
`;

const StyledImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  display: ${({ $loaded }) => ($loaded ? "block" : "none")};
`;

const LazyImage = ({ src, alt,width,height }: { src: string; alt: string ;width:string;height:string}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ImageWrapper $width={width} $height={height}>
      {!loaded && <Placeholder />}
      <StyledImage src={src} alt={alt} $loaded={loaded} onLoad={() => setLoaded(true)} />
    </ImageWrapper>
  );
};

export default LazyImage;