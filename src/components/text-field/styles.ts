import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
type InputProps = {
  inFocus: boolean;
}
export const StyledInput = styled.input<InputProps>`
  height: 52px;
  width: 100%;
  padding: 0 16px;

  font-size: 16px;
  background: #fff;
  border: 2px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  outline: none;
  appearance: none;

  transition: border-color 0.2s ease-in;

  :focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`
export const SmallText = styled.small`
  opacity: 0;
`
