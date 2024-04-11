import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider, QueryClient } from "react-query";
import { ApolloProvider } from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import App from "./App.tsx";
import "./index.css";

import dayjs from "dayjs";
import "dayjs/locale/uk";
import "dayjs/plugin/localizedFormat";
import "dayjs/plugin/advancedFormat";
import { client } from "./api/apolloClient.ts";

dayjs.locale("uk");

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B3B3B",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          textTransform: "capitalize",
          paddingTop: "15px",
          paddingBottom: "15px",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
