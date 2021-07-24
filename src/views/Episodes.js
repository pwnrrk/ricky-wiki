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
import { getEpisodes } from "../services";
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

let EpisodeColumns = null;
export default class Episodes extends React.Component {
  state = {
    ready: false
  };
  data = null;
  page = null;
  maxPage = 0;

  async getData() {
    this.page = parseInt(this.props.page);
    this.setState({ ready: false });
    const data = await getEpisodes(this.page);
    this.data = data;
    EpisodeColumns = data.results.map(episode => (
      <Column key={`${episode.id}-card`}>
        <ColumnContent>
          <Info>
            <InfoHeader>{episode.name}</InfoHeader>
            <span>Type: {episode.type}</span>
            <span>Dimension: {episode.dimension}</span>
          </Info>
        </ColumnContent>
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
          <Pager key={`page-${index}`}>
            <NavLink activeClassName="active" to={`/episodes/page/${index}`}>
              {index}
            </NavLink>
          </Pager>
        );
      }
      this.maxPage = this.page + 2;
      PageLinks = PageLinks.slice(
        this.page >= 3
          ? this.page -
              (this.maxPage > this.data.info.pages
                ? this.data.info.pages > 5
                  ? 5
                  : 0
                : 3)
          : 0,
        this.maxPage
      );
      return (
        <div>
          <Wrapper>
            <Row>{EpisodeColumns}</Row>
          </Wrapper>
          <Pager>
            <PageLink hidden={this.page > 1 ? false : true}>
              <Link to={`/episodes/page/${this.page - 1}`}>
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
              <Link to={`/episodes/page/${this.data.info.pages}`}>
                {this.data.info.pages}
              </Link>
            </PageLink>
            <PageLink
              hidden={this.maxPage >= this.data.info.pages ? true : false}
            >
              <Link to={`/episodes/page/${this.page + 1}`}>
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
