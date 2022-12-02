import React from "react";
import { styled } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import carbon_image from "../../assets/images/galaxy.jpg";
import { NavBar } from "../sharedComponents/NavBar";
import { useNavigate } from "react-router-dom";


interface Props {
  title: string;
}
//nav bar is separate component
const Root = styled("div")({
  padding: 0,
  margin: 0,
});
const Main = styled("main")({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${carbon_image});`,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "absolute",
});
const MainText = styled("div")({
  textAlign: "center",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
});

export const Home = (props: Props) => {
  const navigate = useNavigate();
  const myAuth = localStorage.getItem("auth");

    return (
      <Root>
        <NavBar />
        <Main>
          <MainText className="main-home">
            <Typography variant="h1">{props.title}</Typography>
            <Typography variant="body1">What is our impact?</Typography>
            <br />
            <br />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              alignItems="center"
              justifyContent="center">
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate("/Dashboard")}>Track CO2</Button>
              </div>

              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate("/About")}>Learn More</Button>
              </div>
            </Stack>
          </MainText>
        </Main>
      </Root>
    );
}