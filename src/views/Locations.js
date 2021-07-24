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
import { getLocations } from "../services";
import { Container } from "../utils/Elements";

const Wrapper = styled(Container)`
  animation: ${FadeIn} 0.3s ease;
`;

const LocationRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
`;

const LocationColumn = styled.div`
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

const LocationContent = styled.div`
  display: flex;
  padding: 1rem;
  line-height: 1.5;
  & > * {
    padding: 0 0.25rem;
  }
`;

const LocationInfo = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  line-height: 1.5;
`;

const LocationName = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
`;

let LocationColumns = null;

const Pager = styled.div`
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
export default class Locations extends React.Component {
  state = {
    ready: false
  };
  data = null;
  page = null;
  maxPage = 0;

  async getData() {
    this.page = parseInt(this.props.page);
    this.setState({ ready: false });
    const data = await getLocations(this.page);
    this.data = data;
    LocationColumns = data.results.map(location => (
      <LocationColumn key={`${location.id}-card`}>
        <LocationContent>
          <LocationInfo>
            <LocationName>{location.name}</LocationName>
            <span>Type: {location.type}</span>
            <span>Dimension: {location.dimension}</span>
          </LocationInfo>
        </LocationContent>
      </LocationColumn>
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
            <NavLink activeClassName="active" to={`/locations/page/${index}`}>
              {index}
            </NavLink>
          </PageLink>
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
            <LocationRow>{LocationColumns}</LocationRow>
          </Wrapper>
          <Pager>
            <PageLink hidden={this.page > 1 ? false : true}>
              <Link to={`/locations/page/${this.page - 1}`}>
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
              <Link to={`/locations/page/${this.data.info.pages}`}>
                {this.data.info.pages}
              </Link>
            </PageLink>
            <PageLink
              hidden={this.maxPage >= this.data.info.pages ? true : false}
            >
              <Link to={`/locations/page/${this.page + 1}`}>
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
