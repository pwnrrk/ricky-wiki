import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { FadeIn } from "../utils/Animation";
import { getCharacters } from "../services";
import {
  Column,
  ColumnContent,
  Container,
  Info,
  InfoHeader,
  PageLink,
  Pager,
  Row
} from "../utils/Elements";

const Wrapper = styled(Container)`
  animation: ${FadeIn} 0.3s ease;
`;

const CharacterImage = styled.img`
  width: 128px;
  height: 128px;
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
      <Column key={`${character.id}-card`}>
        <Link to={`/characters/detail/${character.id}`}>
          <ColumnContent>
            <CharacterImage src={character.image} />
            <Info>
              <InfoHeader>{character.name}</InfoHeader>
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
            </Info>
          </ColumnContent>
        </Link>
      </Column>
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
            <Row>{CharacterColumns}</Row>
          </Wrapper>
          <Pager>
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
          </Pager>
        </div>
      );
    }
    return <Loading />;
  }
}
