import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

interface PrivateRouteProps {
  children: ReactNode;
}

interface User {
  id: string;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const [auth, set$auth] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/user");

        set$auth(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!auth) return;

    if (!auth?.id) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return props.children;
};
