import React from "react";
import Container from "@material-ui/core/Container";
import TopBar from "../TopBar/TopBar";

export default function DashboardContainer(props) {
  const { user } = props;

  return (
    <>
      <TopBar user={user} />
      <Container maxWidth="xl">
        {props.children}
      </Container>
    </>
  );
}
