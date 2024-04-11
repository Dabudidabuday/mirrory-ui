import {
  Backdrop,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

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
    },
    {
      path: "notes",
      name: "Мої записи",
    },
    {
      path: "templates",
      name: "Шаблони",
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

  const handleToggle = () => {
    set$menuOpen(!menuOpen);
  };

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
      {/* <Button variant="outlined" onClick={handleLogout}></Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menuOpen}
        onClick={handleClose}
      ></Backdrop>
      <Button
        sx={{
          width: 72,
          height: 72,
          backgroundColor: "#FCFBFA",
          boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          zIndex: 1202,
        }}
        className={menuOpen ? "burger-button active" : "burger-button"}
        onClick={handleToggle}
        ref={anchorRef}
        id="composition-button"
        aria-controls={menuOpen ? "composition-menu" : undefined}
        aria-expanded={menuOpen ? "true" : undefined}
        aria-haspopup="true"
      >
        <span className="burger-line--1"></span>
        <span className="burger-line--2"></span>
        <span className="burger-line--3"></span>
      </Button>
      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        sx={{ zIndex: 1202 }}
        placement="right-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "left-start" ? "left bottom" : "left top",
            }}
          >
            <Paper sx={{ marginLeft: "32px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={menuOpen}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {pages.map(({ path, name, callback = () => null }) => (
                    <MenuItem
                      key={path}
                      sx={{
                        paddingY: "24px",
                        paddingX: "32px",
                        width: "369px",
                        "&:hover": {
                          backgroundColor: "#F3F1EC",
                        },
                      }}
                      onClick={(e) => {
                        handleClose(e, path);
                        callback();
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
