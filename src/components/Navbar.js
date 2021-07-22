import { Link } from "react-router-dom";

const { default: styled } = require("styled-components");

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
`;

const Brands = styled.div`
  position: relative;
  z-index: 1;
  text-decoration: none;
  color: var(--font-color);
  font-size: 1.5rem;
  font-weight: 600;
`;

const NavMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled.div`
  a {
    color: var(--font-color);
    text-decoration: none;
    margin: 0 1rem;
    &::after {
      content: "";
      display: block;
      height: 4px;
      background-color: var(--font-color);
      transform: scale(0);
      transform-origin: top left;
      transition: transform 0.25s ease;
    }
    &:hover {
      &::after {
        transform: scale(1);
      }
    }
    &.active {
      color: var(--primary);
      &::after {
        transform: scale(1);
        background-color: var(--primary) !important;
      }
    }
  }
`;

const NavSearchWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const NavSearch = styled.input`
  appearance: none;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  color: var(--font-color);
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
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

const Navbar = () => (
  <Wrapper>
    <Brands>Ricky Wiki</Brands>
    <NavMenu>
      <NavLink>
        <Link to="/">Home</Link>
      </NavLink>
      <NavLink>
        <Link to="/characters">Characters</Link>
      </NavLink>
      <NavLink>
        <Link to="/locations">Locations</Link>
      </NavLink>
      <NavLink>
        <Link to="/episodes">Episodes</Link>
      </NavLink>
    </NavMenu>
    <NavSearchWrapper>
      <NavSearch placeholder="Search" />
      <SearchButton>Search</SearchButton>
    </NavSearchWrapper>
  </Wrapper>
);
export default Navbar;
