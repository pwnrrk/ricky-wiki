import styled from "styled-components";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const View = styled.div`
  padding-top: 5rem;
`;

function App() {
  return (
    <div id="app">
      <Navbar />
      <View>
        <Routes />
      </View>
      <Footer />
    </div>
  );
}

export default App;
