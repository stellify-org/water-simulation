import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export const DrawerComponent = () => {
  const [state, setState] = useState({
    left: false,
    top: false,
    right: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "70%",
        p: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <CloseIcon sx={{ fontSize: 35, color: "white", mb: 2 }} />
        </IconButton>
      </Box>
      <Box>
        <Typography sx={{ color: "white" }}>Water Simulator</Typography>
        <Typography sx={{ color: "#767676", fontSize: "14px" }}>
          is an interactive simulator that allows you to explore the water
          resources of our planet, Earth. The globe displays countries, rivers,
          and the world's oceans. When hovering over a country, detailed
          information about its water resources, including rivers, lakes, ocean
          currents, and other hydrographic features, appears in the left menu.
        </Typography>
      </Box>
      <Box sx={{}}>
        <Typography sx={{ color: "white" }}>Stelify</Typography>
        <Typography sx={{ color: "#767676", fontSize: "14px" }}>
          is our team specializing in software development. Our current project
          is a water simulator that will help users better understand the
          importance of water in our lives. We aim to use our knowledge and
          skills to create original and innovative software.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {!state.right && (
            <IconButton onClick={toggleDrawer(anchor, true)}>
              <MenuIcon sx={{ fontSize: 35, color: "white" }} />
            </IconButton>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};
