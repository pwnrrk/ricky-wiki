import { DotLoader } from "react-spinners";
import styled from "styled-components";

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
  background-color: #000000;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 0.25rem;
  }
`;

const Loading = () => (
  <LoadingWrapper>
    <LoadingMessage>
      <span>Loading</span>
      <DotLoader color="#ddd" loading={true} size={32} />
    </LoadingMessage>
  </LoadingWrapper>
);

export default Loading;
