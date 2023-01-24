import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
type InputProps = {
  inFocus: boolean;
}
export const Input = styled.input<InputProps>`
  padding: 8px;
  font-size: 16px;

  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  appearance: none;

  transition: border-color 0.3s ease-in;
  :focus {
    border-color: blue;
  }
`
export const SmallText = styled.small`
  opacity: 0;
`
