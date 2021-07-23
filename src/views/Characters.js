import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { FadeIn } from "../helpers/Animation";
import { getCharacters } from "../services";

const Wrapper = styled.div`
  max-width: 1140px;
  margin: auto;
  animation: ${FadeIn} 0.3s ease;
`;

const CharacterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
`;

const CharacterColumn = styled.div`
  flex: 1 1 40%;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: #2b2b2b;
  cursor: pointer;
  transition: all 0.25s ease;
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const CharacterContent = styled.div`
  display: flex;
  padding: 1rem;
  line-height: 1.5;
  & > * {
    padding: 0 0.25rem;
  }
`;

const CharacterImage = styled.img`
  width: 128px;
  height: 128px;
`;

const CharacterInfo = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  line-height: 1.5;
`;

const CharacterName = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
`;

const statusColor = {
  Alive: "green",
  Dead: "red",
  unknown: "cyan"
};

const CharacterStatus = styled.span`
  color: ${props => statusColor[props.status]};
`;

let CharacterColumns = null;

const CharacterPager = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const PageLink = styled.div`
  padding: 0 0.25rem;
  a:not(.active) {
    color: inherit;
    text-decoration: none;
  }
`;
export default class Characters extends React.Component {
  state = {
    ready: false
  };
  data = null;
  page = null;
  maxPage = 0;

  async getData() {
    this.page = parseInt(this.props.page);
    this.setState({ ready: false });
    const data = await getCharacters(this.page);
    this.data = data;
    CharacterColumns = data.results.map(character => (
      <CharacterColumn key={character.id}>
        <Link to="/characters/detail">
          <CharacterContent>
            <CharacterImage src={character.image} />
            <CharacterInfo>
              <CharacterName>{character.name}</CharacterName>
              <div>
                Status:{" "}
                <CharacterStatus status={character.status}>
                  {character.status}
                </CharacterStatus>
              </div>
              <span>Species: {character.species}</span>
              <span>Gender: {character.gender}</span>
              <span>Type: {character.type ? character.type : "Normal"}</span>
              <span>Origin: {character.origin.name}</span>
            </CharacterInfo>
          </CharacterContent>
        </Link>
      </CharacterColumn>
    ));
    this.setState({ ready: true });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.getData();
    }
  }

  render() {
    if (this.state.ready) {
      let PageLinks = [];
      for (let index = 1; index <= this.data.info.pages; index++) {
        PageLinks.push(
          <PageLink key={`page-${index}`}>
            <NavLink activeClassName="active" to={`/characters/page/${index}`}>
              {index}
            </NavLink>
          </PageLink>
        );
      }
      this.maxPage = this.page + 2;
      PageLinks = PageLinks.slice(
        this.page >= 3
          ? this.page - (this.maxPage > this.data.info.pages ? 5 : 3)
          : 0,
        this.maxPage
      );
      return (
        <div>
          <Wrapper>
            <CharacterRow>{CharacterColumns}</CharacterRow>
          </Wrapper>
          <CharacterPager>
            <PageLink hidden={this.page > 1 ? false : true}>
              <Link to={`/characters/page/${this.page - 1}`}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Link>
            </PageLink>
            {PageLinks}
            <PageLink
              hidden={this.maxPage >= this.data.info.pages ? true : false}
            >
              ...
            </PageLink>
            <PageLink
              hidden={this.maxPage >= this.data.info.pages ? true : false}
            >
              <Link to={`/characters/page/${this.data.info.pages}`}>
                {this.data.info.pages}
              </Link>
            </PageLink>
            <PageLink
              hidden={this.maxPage >= this.data.info.pages ? true : false}
            >
              <Link to={`/characters/page/${this.page + 1}`}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </PageLink>
          </CharacterPager>
        </div>
      );
    }
    return <Loading />;
  }
}
