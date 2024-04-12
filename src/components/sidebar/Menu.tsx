import { MenuList, MenuItem, Box, Typography } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import mirroryLogo from "../../assets/mirrory-logo.svg";
import { HomeOutlined } from "@mui/icons-material";

export const Menu = () => {
  const navigate = useNavigate();

  const [menuOpen, set$menuOpen] = useState<boolean>(false);
  const prevOpen = React.useRef(menuOpen);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    googleLogout();

    await api.post("/logout");

    api.defaults.headers.common["Authorization"] = "";

    navigate("/login");
  };

  const pages = [
    {
      path: "home",
      name: "Домашня сторінка",
      icon: <HomeOutlined />,
    },
    {
      path: "notes",
      name: "Мої записи",
    },
    {
      path: "templates",
      name: "Практики",
    },
    {
      path: "calendar",
      name: "Мій Календар",
    },
    {
      path: "profile",
      name: "Профіль",
    },
    {
      path: "",
      name: "Вийти",
      callback: handleLogout,
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
                paddingY: "24px",
                paddingX: "0",
                "&:hover": {
                  backgroundColor: "#F3F1EC",
                },
              }}
              onClick={(e) => {
                handleClose(e, path);
                callback();
              }}
            >
              {icon}
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </>
  );
};
