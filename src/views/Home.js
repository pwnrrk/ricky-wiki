import React from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import { FadeIn, SlideUp } from "../utils/Animation";
import {
  getCharacterCount,
  getEpisodeCount,
  getLocationCount
} from "../services";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${FadeIn} 0.5s ease;
  & > * {
    margin-bottom: 3rem;
    animation: ${SlideUp} 1s ease;
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
  text-align: center;
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

class Body extends React.Component {
  state = {
    character_count: 0,
    episode_count: 0,
    location_count: 0
  };

  increaseValue(key, target) {
    let temp = target - 20;
    this.setState({ [key]: temp });
    let interval = setInterval(() => {
      var value = this.state[key];
      if (value === target) {
        clearInterval(interval);
        return;
      }
      value++;
      this.setState({ [key]: value });
    }, 70);
  }

  componentDidMount() {
    this.increaseValue("character_count", this.props.character_count);
    this.increaseValue("episode_count", this.props.episode_count);
    this.increaseValue("location_count", this.props.location_count);
  }
  render() {
    return (
      <Wrapper>
        <LogoWrapper>
          <Logo src="/logo.png" />
          <span>
            Created by{" "}
            <a
              href="https://en.wikipedia.org/wiki/Justin_Roiland"
              target="_blank"
              rel="noreferrer"
            >
              Justin Roiland
            </a>{" "}
            and{" "}
            <a
              href="https://en.wikipedia.org/wiki/Dan_Harmon"
              target="_blank"
              rel="noreferrer"
            >
              Dan Harmon
            </a>
          </span>
        </LogoWrapper>
        <InfoWrapper>
          <Info>
            <InfoHeader>{this.state.episode_count}</InfoHeader>
            <span>Episodes on screen</span>
          </Info>
          <Info>
            <InfoHeader>{this.state.location_count}</InfoHeader>
            <span>Locations Travelled</span>
          </Info>
          <Info>
            <InfoHeader>{this.state.character_count}</InfoHeader>
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
  }
}

export default class Home extends React.Component {
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
      return <Loading />;
    }
  }
}
