import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'transparent'
}
export const Button = styled.button<ButtonProps>`
  font-size: 16px;
  padding: 8px;

  outline: none;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition: background 0.3s ease-in;

  :hover {
    background: blue;
  }

  ${({ variant }) => variant === 'secondary' && css`
    background: none;
    border: 1px solid black;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
  `}
`
