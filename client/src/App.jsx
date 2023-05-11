import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";
import { darkTheme, lighTheme } from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Video } from "./pages/Video";
import { Home } from "./pages/Home";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lighTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" />
                <Route index element={<Home />} />
                <Route path="video" />
                <Route path=":id" element={<Video />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
