import { useState } from "react";
import styled from "styled-components";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div``;

function App() {
  return (
    <Container>
      <Menu />
      <Main>
        <Navbar />
        <Wrapper>video card</Wrapper>
      </Main>
    </Container>
  );
}

export default App;
