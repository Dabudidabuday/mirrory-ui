import { MenuList, MenuItem, Box, Typography, Icon } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import mirroryLogo from "../../assets/mirrory-logo.svg";
import {
  AutoStoriesOutlined,
  CalendarTodayOutlined,
  GridOnOutlined,
  HomeOutlined,
  ImportContacts,
  Logout,
  PersonOffOutlined,
  SelfImprovementOutlined,
} from "@mui/icons-material";

export const Menu = () => {
  const navigate = useNavigate();

  const [menuOpen, set$menuOpen] = useState<boolean>(false);
  const prevOpen = React.useRef(menuOpen);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    googleLogout();

    const loggedOut = await api.post("/logout");

    api.defaults.headers.common["Authorization"] = "";
    navigate("/login");
  };

  const pages = [
    {
      name: "Домашня сторінка",
      icon: <HomeOutlined />,
      callback: () => navigate("/"),
    },
    {
      path: "notes",
      name: "Мої записи",
      icon: <AutoStoriesOutlined />,
    },
    {
      path: "sprints",
      name: "Спринти",
      icon: <GridOnOutlined />,
    },
    {
      path: "templates",
      name: "Практики",
      icon: <SelfImprovementOutlined />,
    },
    {
      path: "diary",
      name: "Щоденник",
      icon: <ImportContacts />,
    },
    {
      path: "calendar",
      name: "Мій Календар",
      icon: <CalendarTodayOutlined />,
    },
    {
      path: "profile",
      name: "Профіль",
      icon: <PersonOffOutlined />,
    },
    {
      path: "",
      name: "Вийти",
      callback: handleLogout,
      icon: <Logout />,
    },
  ];

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      set$menuOpen(false);
    } else if (event.key === "Escape") {
      set$menuOpen(false);
    }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  const handleClose = (
    event: Event | React.SyntheticEvent,
    path?: string | undefined
  ) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    set$menuOpen(false);

    if (path) navigate(`/${path}`);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F3EEE5",
          height: "calc(100vh - 56px)",
          width: "224px",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "60px",
          }}
        >
          <img src={mirroryLogo} alt="" />
          <Typography variant="h5">Mirrory</Typography>
        </Box>
        <MenuList
          autoFocusItem={menuOpen}
          id="composition-menu"
          aria-labelledby="composition-button"
          onKeyDown={handleListKeyDown}
        >
          {pages.map(({ path, name, icon, callback = () => null }) => (
            <MenuItem
              key={path}
              sx={{
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#c3c3c3c",
                },
              }}
              onClick={(e) => {
                handleClose(e, path);
                callback();
              }}
            >
              <Icon sx={{ marginRight: 2 }}>{icon}</Icon>
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </>
  );
};
