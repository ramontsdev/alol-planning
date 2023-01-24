import BaseLink from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: rgba(111, 111, 111);
`
export const Header = styled.header`
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 16px;

  background: red;
`
export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-bottom: 16px;
  }
`
export const Link = styled(BaseLink)`
  text-decoration: none;
  color: inherit;
`
