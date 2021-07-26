import React from "react";
import { Container } from "../utils/Elements";
import Loading from "../components/Loading";
import { getCharacterDetail } from "../services";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Container)`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #2b2b2b;
  line-height: 2;
  display: flex;
  & > * {
    flex: 0 1 auto;
    padding: 0.5rem;
  }
`;

const statusColor = {
  Alive: "green",
  Dead: "red",
  unknown: "cyan"
};

const CharacterStatus = styled.span`
  color: ${props => statusColor[props.status]};
`;
export default class CharacterDetail extends React.Component {
  state = {
    ready: false
  };
  data = null;
  async getData() {
    const data = await getCharacterDetail(this.props.id);
    this.data = data;
    this.setState({ ready: true });
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getData();
    }
  }
  render() {
    if (this.state.ready) {
      return (
        <Wrapper>
          <img src={this.data.image} alt={`${this.data.name}-Profile`} />
          <div>
            <h3>{this.data.name}</h3>
            <div>
              Status:{" "}
              <CharacterStatus status={this.data.status}>
                {this.data.status}
              </CharacterStatus>
            </div>
            <div>Species: {this.data.species}</div>
            <div>Gender: {this.data.gender}</div>
            <div>Type: {this.data.type ? this.data.type : "Normal"}</div>
            <div>
              Origin: <Link to="">{this.data.origin.name}</Link>
            </div>
            <div>
              Current location: <Link to="">{this.data.location.name}</Link>
            </div>
          </div>
        </Wrapper>
      );
    }
    return <Loading />;
  }
}
