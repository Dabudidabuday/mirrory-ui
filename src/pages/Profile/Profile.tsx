import React, { useEffect, useState } from "react";
import { api } from "../../api";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface ProfileFormData {
  first_name: string;
  last_name: string;
  picture: string | undefined;
}

export const Profile = () => {
  const [isEdit, set$isEdit] = useState(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      picture: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["user info"],
    queryFn: async () => {
      const response = await api.get("/user");

      return response.data;
    },
  });

  useEffect(() => {
    if (isLoading) return;
    setValue("first_name", data.first_name);
    setValue("last_name", data.last_name);
  }, [data, isLoading, setValue]);

  const handleReset = () => {
    setValue("first_name", data.first_name);
    setValue("last_name", data.last_name);

    set$isEdit(false);
  };

  const onSubmit = async (data: ProfileFormData) => {
    const preparedData =
      data.picture === ""
        ? {
            first_name: data.first_name,
            last_name: data.last_name,
          }
        : data;

    await api.post("profile/update", preparedData);

    set$isEdit(false);
  };

  if (isLoading)
    return (
      <>
        <CircularProgress />
      </>
    );

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: 3 }}>
        Мій Профіль
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Імʼя" disabled={!isEdit} />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Прізвище" disabled={!isEdit} />
            )}
          />
        </Box>
        <Avatar
          sx={{ width: 108, height: 108 }}
          src={data?.picture ? data.picture : ""}
        />
      </Box>

      {isEdit ? (
        <>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Зберегти
          </Button>

          <Button
            sx={{ marginLeft: 2 }}
            variant="outlined"
            onClick={handleReset}
          >
            Скасувати
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={() => set$isEdit(!isEdit)}>
          Редагувати
        </Button>
      )}
    </>
  );
};
