import styled from "styled-components";

export const Container = styled.div`
  max-width: 1140px;
  margin: auto;
`;

export const Button = styled.button`
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  color: var(--font-color);
  border: 1px solid transparent;
  background-color: var(--primary);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.25s ease-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--primary-dark);
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
`;

export const Column = styled.div`
  flex: 1 1 40%;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: #2b2b2b;
  transition: all 0.25s ease;
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const ColumnContent = styled.div`
  display: flex;
  padding: 1rem;
  line-height: 1.5;
  & > * {
    padding: 0 0.25rem;
  }
`;

export const Info = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  line-height: 1.5;
`;

export const InfoHeader = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
`;

export const Pager = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const PageLink = styled.div`
  padding: 0 0.25rem;
  a:not(.active) {
    color: inherit;
    text-decoration: none;
  }
`;
