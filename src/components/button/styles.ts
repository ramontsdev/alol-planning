import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'transparent'
  danger?: boolean;
  h?: number;
}
export const StyledButton = styled.button<ButtonProps>`
  height: ${({ h }) => h}px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 16px;

  font-size:  16px;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s ease-in;

  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: #ccc !important;
    cursor: no-drop !important;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}

  ${({ variant }) => variant === 'secondary' && css`
    background: none;
    border: 1px solid black;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
  `}
`
