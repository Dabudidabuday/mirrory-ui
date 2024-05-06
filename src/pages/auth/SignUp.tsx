import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface SignUpFormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export const SignUp = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const response = await api.post("/register", data);

    if (!response) {
      return;
    }

    navigate("/");
  };

  const onGoogleSuccess = async (googleUser: CredentialResponse) => {
    try {
      const response = await api.post("google-login", {
        token: googleUser.credential,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const onError = () => {
    console.error("error while trying to signin with google account");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <GoogleLogin onSuccess={onGoogleSuccess} onError={onError} />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                label="Пошта"
                name="email"
              />
            )}
          />
          <Controller
            name="first_name"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                label="Імʼя"
                name="first_name"
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                label="Прізвище"
                name="last_name"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                name="password"
                label="Пароль"
                type="password"
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <TextField
                margin="normal"
                onChange={onChange}
                name="password_confirm"
                label="Підтвердіть пароль"
                type="password"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "capitalize", width: "100%" }}
          >
            Зареєструватись
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
