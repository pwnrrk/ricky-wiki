import React from "react";
import { Link, NavLink } from "react-router-dom";
import { createRef } from "react/cjs/react.production.min";
import { searchCharacter } from "../services/Search.service";
import { Button } from "../utils/Elements";
import { DotLoader } from "react-spinners";

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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;
`;

const NavSearchGroup = styled.div`
  position: relative;
`;

const NavSearchList = styled.ul`
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  background-color: #2b2b2b;
  max-height: 50vh;
  overflow: auto;
`;
const NavSearchListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  min-width: 150px;
  &:hover {
    background-color: var(--primary);
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: inherit;
    }
  }
  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    margin-right: 0.5rem;
  }
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

export default class Navbar extends React.Component {
  searchBox = createRef();
  state = {
    NavSearchListItems: null,
    loading: false
  };

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.getInput = this.getInput.bind(this);
    this.clearList = this.clearList.bind(this);
  }
  async search() {
    this.setState({ loading: true });
    const input = await this.getInput();
    const request = await searchCharacter(input);
    if (request.error) {
      let NavSearchListItems = <NavSearchListItem style={{pointerEvents: 'none'}}>Not Found</NavSearchListItem>;
      this.setState({ NavSearchListItems: NavSearchListItems, loading: false });
      return;
    }
    let NavSearchListItems = request.results.map(result => (
      <NavSearchListItem key={`result-${result.id}`}>
        <Link to={`/characters/detail/${result.id}`} onClick={this.clearList}>
          <img src={result.image} alt={`${result.name}-avatar`} />
          <span>{result.name}</span>
        </Link>
      </NavSearchListItem>
    ));
    this.setState({ NavSearchListItems: NavSearchListItems, loading: false });
  }
  clearList() {
    this.setState({ NavSearchListItems: null });
  }
  getInput() {
    return new Promise(resolve => {
      let counter = 0;
      let delayTime = 1;
      let searchBox = this.searchBox.current;
      if (searchBox) {
        let localQuery = searchBox.value;
        let interval = setInterval(() => {
          counter++;
          if (counter >= delayTime && localQuery === searchBox.value) {
            clearInterval(interval);
            resolve(localQuery);
          } else if (counter >= delayTime) {
            counter = 0;
          }
        }, 1000);
      } else {
        resolve("");
      }
    });
  }
  render() {
    return (
      <Wrapper>
        <Brands>Rick And Morty Status</Brands>
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
          <DotLoader color="#ddd" loading={this.state.loading} size={16} />
          <NavSearchGroup>
            <NavSearch
              ref={this.searchBox}
              onInput={this.search}
              onBlur={this.clearList}
              placeholder="Search"
            />
            <NavSearchList>{this.state.NavSearchListItems}</NavSearchList>
          </NavSearchGroup>
          <Button>Search</Button>
        </NavSearchWrapper>
      </Wrapper>
    );
  }
}
