import { NavLink } from "react-router-dom";
import { Button } from "../utils/Elements";

const { default: styled } = require("styled-components");

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.9);
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

const NavItem = styled.div`
  a {
    display: inline-block;
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

const Navbar = () => (
  <Wrapper>
    <Brands>Ricky Wiki</Brands>
    <NavMenu>
      <NavItem>
        <NavLink to="/home" activeClassName="active">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/characters" activeClassName="active">
          Characters
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/locations" activeClassName="active">
          Locations
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/episodes" activeClassName="active">
          Episodes
        </NavLink>
      </NavItem>
    </NavMenu>
    <NavSearchWrapper>
      <NavSearch placeholder="Search" />
      <Button>Search</Button>
    </NavSearchWrapper>
  </Wrapper>
);
export default Navbar;
