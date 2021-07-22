import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const View = styled.div`
  padding-top: 5rem;
`;

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar />
        <View>
          <Routes />
        </View>
      </BrowserRouter>
    </div>
  );
}

export default App;
