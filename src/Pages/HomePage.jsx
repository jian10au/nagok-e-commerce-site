import React from "react";
import Main from "../Layout/Main";

function HomePage(props) {
  const category = props.match.params.id ? props.match.params.id : "";
  return <Main category={category} />;
}

export default HomePage;
