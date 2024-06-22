import React from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";

const AppContainer = styled.div`
  width: 70vw;
  height: 80vh;
  border: 1px solid white;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer></AppContainer>
    </>
  );
};

export default App;
