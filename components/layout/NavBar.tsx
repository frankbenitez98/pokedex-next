import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
const NavBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-end" },
        gap: "16px",
      }}
    >
      <Link
        href="/favorites"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button variant="outlined" size="large" color="inherit" type="button">
          Favorites
        </Button>
      </Link>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Button variant="outlined" size="large" color="inherit">
          home
        </Button>
      </Link>
    </Box>
  );
};

export default NavBar;
