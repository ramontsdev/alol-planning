import styled, { css, keyframes } from "styled-components";

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
export const AdminWrapper = styled.div`
  display: flex;
  flex-direction: row;

  button:last-child {
    margin-left: 12px;
  }
`
export const Main = styled.main`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 8px;
  padding-bottom: 8px;

  overflow: auto;

  background: green;
`
export const Wrapper = styled.div`
  width: 720px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;

  margin-top: auto;
  margin-bottom: auto;
`
export const VoterUserCard = styled.div`
  display: flex;
  align-items: center;

  padding: 4px;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: yellow;
  border-radius: 8px;

  overflow: hidden;
`
type CircleVote = {
  hasVote: boolean;
  showVote: boolean;
}
export const CircleVote = styled.div<CircleVote>`
  width: 35px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 4px;

  background: white;
  background: ${({ hasVote, showVote }) => {
    if (hasVote && !showVote)
      return 'red'
    if (showVote)
      return 'white'
  }};
  border-radius: 50%;

  overflow: hidden;
`
export const VoteCardsArea = styled.div`
  padding: 8px;
  min-height: 70px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  background: blue;

  background: white;
  overflow-x: auto;
`
type VoteCardProps = {
  isSelected: boolean;
}
const backgroundAnimatedIn = keyframes`
  from {
    background: gray;
  }
  to {
    background: teal;
  }
`
export const VoteCard = styled.div<VoteCardProps>`
  width: 40px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 12px;
  margin-top: 4px;

  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  background: gray;

  transition: background 0.3s ease-in;

  :hover {
    background: rgba(0, 0, 0, 0.3);
  }

  ${({ isSelected }) => isSelected && css`
    animation: ${backgroundAnimatedIn} 0.3s ease-in forwards;
  `}

  cursor: pointer;
`
