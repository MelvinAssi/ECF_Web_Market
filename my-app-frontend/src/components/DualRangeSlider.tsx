import { useState } from "react";
import styled from "styled-components";

interface DualRangeSliderProps {
  min: number;
  max: number;
  onChange?: (min: number, max: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 14px;
  border: 1px solid var(--color4);
  border-radius: 4px;
`;

const SliderWrapper = styled.div`
  position: relative;
  height: 36px;
`;

const StyledRange = styled.input.attrs({ type: "range" })`
  position: absolute;
  width: 100%;
  height: 36px;
  background: none;
  pointer-events: none;
  appearance: none;
  z-index: 2;

  &::-webkit-slider-thumb {
    appearance: none;
    pointer-events: all;
    width: 16px;
    height: 16px;
    background: var(--color3);
    border: 2px solid var(--color2);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
    position: relative;
    z-index: 3;
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: transparent;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    width: 16px;
    height: 16px;
    background: var(--color3);
    border: 2px solid var(--color2);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-track {
    height: 4px;
    background: transparent;
  }
`;

const Track = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--color4);
  border-radius: 4px;
  z-index: 1;
`;

const Fill = styled.div<{ $left: number; $right: number }>`
  position: absolute;
  top: 16px;
  left: ${(props) => props.$left}%;
  right: ${(props) => props.$right}%;
  height: 4px;
  background-color: var(--color3);
  border-radius: 4px;
  z-index: 2;
`;

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const percent = (value: number) => ((value - min) / (max - min)) * 100;

  const handleMinInput = (value: number) => {
    if (value < maxVal && value >= min) {
      setMinVal(value);
      onChange?.(value, maxVal);
    }
  };

  const handleMaxInput = (value: number) => {
    if (value > minVal && value <= max) {
      setMaxVal(value);
      onChange?.(minVal, value);
    }
  };

  return (
    <Container>
      <InputGroup>
        <NumberInput
          type="number"
          value={minVal}
          min={min}
          max={maxVal - 1}
          onChange={(e) => handleMinInput(Number(e.target.value))}
        />
        <NumberInput
          type="number"
          value={maxVal}
          min={minVal + 1}
          max={max}
          onChange={(e) => handleMaxInput(Number(e.target.value))}
        />
      </InputGroup>

      <SliderWrapper>
        <Track />
        <Fill $left={percent(minVal)} $right={100 - percent(maxVal)} />

        <StyledRange
          min={min}
          max={max - 1}
          value={minVal}
          onChange={(e) => handleMinInput(Number(e.target.value))}
          style={{ zIndex: 3 }}
        />

        <StyledRange
          min={min + 1}
          max={max}
          value={maxVal}
          onChange={(e) => handleMaxInput(Number(e.target.value))}
          style={{ zIndex: 2 }}
        />
      </SliderWrapper>
    </Container>
  );
};

export default DualRangeSlider;
