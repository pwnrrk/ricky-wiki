import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import {
  getCharacterCount,
  getEpisodeCount,
  getLocationCount
} from "../services";
const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 0.25rem;
  }
`;

const Loading = (
  <LoadingWrapper>
    <LoadingMessage>
      <span>Loading</span>
      <DotLoader color="#ddd" loading={true} size={32} />
    </LoadingMessage>
  </LoadingWrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin-bottom: 3rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  flex: 0;
  max-width: 1024px;
  padding: 0.5rem;
`;

const Logo = styled.img`
  width: 100%;
`;

const InfoHeader = styled.span`
  font-size: 4rem;
`;
const NetflixLink = styled.a`
  color: var(--font-color);
  text-decoration: none;
  text-align: center;
`;
const NetflixLogo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

const Body = props => (
  <Wrapper>
    <LogoWrapper>
      <Logo src="/logo.png" />
    </LogoWrapper>
    <InfoWrapper>
      <Info>
        <InfoHeader>{props.episode_count}</InfoHeader>
        <span>Episodes on screen</span>
      </Info>
      <Info>
        <InfoHeader>{props.location_count}</InfoHeader>
        <span>Locations Travelled</span>
      </Info>
      <Info>
        <InfoHeader>{props.character_count}</InfoHeader>
        <span>Characters Created</span>
      </Info>
    </InfoWrapper>
    <NetflixLink
      href="https://www.netflix.com/th-en/title/80014749"
      rel="noreferrer"
      target="_blank"
    >
      Available on
      <div>
        <NetflixLogo src="/Netflix_icon.png" />
      </div>
    </NetflixLink>
    <InfoWrapper>
      <Info>
        <a
          href="https://www.imdb.com/title/tt2861424/"
          target="_blank"
          rel="noreferrer"
        >
          9.2/10 IMDb
        </a>
      </Info>
      <Info>
        <a
          href="https://www.rottentomatoes.com/tv/rick_and_morty"
          target="_blank"
          rel="noreferrer"
        >
          95% Rotten Tomatoes
        </a>
      </Info>
    </InfoWrapper>
  </Wrapper>
);

class Home extends React.Component {
  state = {
    ready: false,
    character_count: 0,
    episode_count: 0,
    location_count: 0
  };

  async componentDidMount() {
    const character_count = await getCharacterCount();
    const episode_count = await getEpisodeCount();
    const location_count = await getLocationCount();
    this.setState({
      ready: true,
      character_count,
      episode_count,
      location_count
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <Body
          character_count={this.state.character_count}
          episode_count={this.state.episode_count}
          location_count={this.state.location_count}
        />
      );
    } else {
      return Loading;
    }
  }
}

export default Home;
