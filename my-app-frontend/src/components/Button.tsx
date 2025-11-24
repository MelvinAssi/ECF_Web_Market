import styled from 'styled-components';

type ButtonVariant = 'type1' | 'type2' | 'type3';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  text: string | React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  disabled?:boolean;
}

interface StyledButtonProps {
  width?: string;
  height?: string;
  $variant?: ButtonVariant;
}

const StyledButton = styled.button<StyledButtonProps>`

    border-radius: 6px;
    cursor: pointer;
    font-family: 'Cormorant', sans-serif;
    font-weight: bold;
    font-size: 20px;
    padding: 8px;
    min-height: 40px;
    width: ${({ width }) => width || '300px'};
    height: ${({ height }) => height || 'auto'};

    background-color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color3)'
        : $variant === 'type2'
        ? 'var(--color4)'
        : 'var(--color5)'
    };
    color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color5)'
        : $variant === 'type2'
        ? 'var(--color5)'
        : 'var(--color3)'
    };
    border-color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color5)'
        : $variant === 'type2'
        ? 'var(--color5)'
        : 'var(--color3)'
    };
    border: 1px solid ;
    transition: all 0.3s;
  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color5)'
        : $variant === 'type2'
        ? 'var(--color5)'
        : 'var(--color3)'
    };
    color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color3)'
        : $variant === 'type2'
        ? 'var(--color4)'
        : 'var(--color5)'
    };
    border-color: ${({ $variant }) =>
        $variant === 'type1'
        ? 'var(--color3)'
        : $variant === 'type2'
        ? 'var(--color4)'
        : 'var(--color5)'
    };
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
    @media (max-width: 767px) {
     width: ${({ width }) => width || '250px'};
  }
`;

const Button: React.FC<ButtonProps> = ({ text, width, height, onClick,type,variant = 'type1' }) => {
  return (
    <StyledButton onClick={onClick} width={width} height={height} type={type} $variant={variant}>
      {text}
    </StyledButton>
  );
};

export default Button;
