import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "./Logo.png";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import WorkIcon from "@mui/icons-material/Work";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Logout } from "@mui/icons-material";
// Fpr prflie pic
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    position: "absolute",
    top: 100,
    left: 155,
    width: "6%",
    height: "8%",
    borderRadius: "50%",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const username = window.localStorage.getItem("user");

// -------------------

const DashBoard = ({ children }) => {
  const history = useHistory();
  function personal() {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("Personal", "Personal");
      history.push("/Personal");
    } else {
      console.error("localStorage is not available in this browser.");
      // Handle the lack of localStorage support in your application
    }
  }

  function work() {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("Work", "Work");
      history.push("/Work");
    } else {
      console.error("localStorage is not available in this browser.");
      // Handle the lack of localStorage support in your application
    }
  }

  return (
    <div>
      <body className="mainBgDashboard">
        <div className="box-dashboard">
          <div className="Menu">
            <div>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar className="avatar" src="/ProfilePic.png" />
                </StyledBadge>
              </Stack>
              <div className="dusername">{username}</div>
             
            </div>

            {/* Profile pic */}
            <div>
              <Typography sx={{ mt: -20, ml: 3 }}>
                You can achieve anything you
              </Typography>
              <Typography sx={{ ml: 2.5, mb: 20 }}>
                put your mind and hard work to..
              </Typography>
            </div>

            <div className="tags">
              <div>
                <Typography sx={{ ml: 0.1, mt: 1, color: "#5b5b5b" }}>
                  Team
                </Typography>
                <nav>
                  <List className="nav">
                    <ListItemButton onClick={() => history.push("/Meeting")}>
                      <ListItemIcon sx={{ color: "#8ae0ff" }}>
                        <Diversity2Icon />
                      </ListItemIcon>
                      <Typography>Meeting</Typography>
                    </ListItemButton>
                  </List>
                </nav>
              </div>
              <div>
                <Divider sx={{ ml: 5 }} />
              </div>
              <div>
                <Typography sx={{ ml: 0.1, mt: 1, color: "#5b5b5b" }}>
                  Lists
                </Typography>
                <nav>
                  <List className="nav">
                    <ListItemButton onClick={personal}>
                      <ListItemIcon sx={{ color: "Yellow" }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <Typography>Personal</Typography>
                    </ListItemButton>

                    <ListItemButton sx={{ mr: 4 }} onClick={work}>
                      <ListItemIcon sx={{ color: "Red" }}>
                        <WorkIcon />
                      </ListItemIcon>
                      <Typography>Work</Typography>
                    </ListItemButton>
                  </List>
                </nav>
                <div>
                  <Divider sx={{ ml: 5 }} />
                </div>
              </div>
              <div>
                <nav>
                  <List className="nav">
                    <ListItemButton
                      sx={{ pr: 0.1 }}
                      onClick={() => history.push("/TimeSheet")}
                    >
                      <ListItemIcon sx={{ color: "#bcbfc1" }}>
                        <PunchClockIcon />
                      </ListItemIcon>
                      <Typography>Time Sheet</Typography>
                    </ListItemButton>
                  </List>
                </nav>
              </div>
            </div>
            <div className="logout">
              <MenuItem onClick={() => history.push("/")}>
                <ListItemIcon sx={{ color: "#2a9df4" }}>
                  <Logout fontSize="small" onClick={() => history.push("/")} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          </div>

          <div className="Dheading">
            <h1 className="capacityplanningHaeding">Capacity planning Tool</h1>
            <img
              className="Logo"
              srcSet={`${Logo}}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${Logo}`}
              alt="money manager Logo"
              loading="lazy"
            />
            <div>
              <div>
                <h4 className="subDhead">
                  A HOUR OF PLANNIG CAN SAVE YOU 10 HOURS OF DOING!
                </h4>
              </div>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </body>
    </div>
  );
};

export default DashBoard;
