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