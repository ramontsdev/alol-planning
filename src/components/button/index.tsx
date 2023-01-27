//export { Button } from './styles';

import { ReactNode } from 'react';
import Spinner from '../spinner';

import { StyledButton } from './styles';

type Props = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: 'primary' | 'secondary' | 'transparent'
  disabled?: boolean;
  isLoading?: boolean;
  danger?: boolean;
  onClick?: () => void;
  h?: number;
}
export function Button({
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  danger = false,
  onClick,
  variant,
  h = 52
}: Props) {
  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
      h={h}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}
