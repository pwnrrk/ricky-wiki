import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { getCharacters } from "../services";
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1140px;
  margin: auto;
`;

const CharacterColumn = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;

const CharacterCardWrapper = styled.div`
  padding: 1rem;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const CharacterCard = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #2b2b2b;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  & > * {
    padding: 0 0.25rem;
  }
  &:hover {
    transform: scale(1.1);
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
class Characters extends React.Component {
  state = {
    ready: false,
    data: null
  };
  async componentDidMount() {
    const data = await getCharacters();
    CharacterColumns = data.results.map(character => (
      <CharacterColumn>
        <CharacterCardWrapper>
          <Link to="/characters/detail">
            <CharacterCard>
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
            </CharacterCard>
          </Link>
        </CharacterCardWrapper>
      </CharacterColumn>
    ));
    this.setState({ ready: true, data: data });
  }
  render() {
    if (this.state.ready) {
      let PageLinks = [];
      for (let index = 1; index <= this.state.data.info.pages; index++) {
        PageLinks.push(
          <PageLink>
            <NavLink activeClassName="active" to={`/characters/page/${index}`}>{index}</NavLink>
          </PageLink>
        );
      }
      return (
        <div>
          <Wrapper>{CharacterColumns}</Wrapper>
          <CharacterPager>{PageLinks}</CharacterPager>
        </div>
      );
    }
    return <Loading />;
  }
}
export default Characters;
