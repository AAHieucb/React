import React from "react";
import NormalRedux from "./Normal redux/index.js";
import ReduxWithHook from "./ReduxWithHook/index.js";
import { Container } from "@material-ui/core";
import ReduxToolkitSaga from "./ReduxToolkitOld/index";
import ReduxToolkitSliceThunk from "./ReduxToolkitSliceThunk/index";
import Project from "./ReduxToolkitInProject/Root.js";

function App() {
  return (
    <Container maxWidth="xl">
      <NormalRedux/>
      <ReduxWithHook/>
      <ReduxToolkitSaga/>
      <ReduxToolkitSliceThunk/>
      <Project/>
    </Container>
  );
}

export default App;
