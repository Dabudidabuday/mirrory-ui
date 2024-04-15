import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Link,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, set$showPassword] = useState(false);

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (data) => {
  //     set$user(data);

  //     console.log("data", data);
  //     try {
  //       const response = await api.post("google-login", {
  //         token: data.access_token,
  //       });

  //       console.log("response", response);
  //       navigate("/dashboard");
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  //   onError: (error) => console.error(error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     console.log("user in effect", user);
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("userData", res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await api.post("/login", data);

    api.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;

    navigate("/home");
  };

  const onGoogleLoginSuccess = async (googleUser: CredentialResponse) => {
    try {
      const response = await api.post("google-login", {
        token: googleUser.credential,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${response?.data}`;

      navigate("/home");
    } catch (e) {
      console.error(e);
    }
  };

  const onError = () => {
    console.log("error while trying to login with google account");
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
          Увійти в додаток Mirrory
        </Typography>

        <Typography>
          Не маєте акаунту? <Link href={"/signin"}>Зареєструватись</Link>
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            mt: 1,
            pt: 5,
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          {/* <Button
            variant="outlined"
            onClick={() => googleLogin()}
            startIcon={<Google />}
          >
            Увійти з Google
          </Button> */}
          <GoogleLogin
            locale="uk"
            width="396"
            size="large"
            onSuccess={onGoogleLoginSuccess}
            onError={onError}
          />

          <Divider
            orientation="horizontal"
            textAlign="center"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            або
          </Divider>

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <TextField
                  margin="normal"
                  label="Пошта"
                  type="email"
                  sx={{ mb: 3 }}
                  {...field}
                />
                {errors["email"] && (
                  <FormHelperText error>Це обовʼязкове поле</FormHelperText>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <>
                <TextField
                  margin="normal"
                  onChange={onChange}
                  name="password"
                  label="Пароль"
                  sx={{ mb: 3 }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => set$showPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors["password"] && (
                  <FormHelperText error>Це обовʼязкове поле</FormHelperText>
                )}
              </>
            )}
          />

          <Link
            href="/forget"
            sx={{ textAlign: "right", textDecoration: "none" }}
          >
            Забули пароль?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
          >
            Увійти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
