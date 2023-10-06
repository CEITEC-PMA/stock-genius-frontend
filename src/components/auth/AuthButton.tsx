import { Box, Grid, IconButton, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AuthButton() {
  const { data: session } = useSession();
  return (
    <Grid height={"100%"} item container justifyContent={"end"}>
      <Grid item alignSelf={"center"}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, textAlign: "right" }}
        >
          USER_NAME
        </Typography>
      </Grid>
      <Grid item alignSelf={"center"}>
        <IconButton
          onClick={() => signOut()}
          color="inherit"
          sx={{ marginLeft: "10px" }}
        >
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
