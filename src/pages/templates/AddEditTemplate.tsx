import React, { useCallback, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

interface Question {
  name: string;
  order: number;
}

interface TemplateFormData {
  title: string;
  description: string;
  item: string;
}

export const AddEditTemplate = () => {
  const navigate = useNavigate();
  const [questions, set$questions] = useState<Question[]>([]);

  const { control, handleSubmit, setValue, getValues } =
    useForm<TemplateFormData>({
      defaultValues: {
        title: "",
        description: "",
        item: "",
      },
    });

  const onCreateItem = useCallback(() => {
    const value = getValues("item");

    setValue("item", "");

    set$questions([{ name: value, order: questions.length }, ...questions]);
  }, [getValues, questions, setValue]);

  const onSubmit = async (data: TemplateFormData) => {
    await api.post("template/create", {
      title: data.title,
      description: data.description,
      questions,
    });

    navigate(-1);
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Створити шаблон
      </Typography>

      <Grid container spacing={4}>
        <Grid item>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Назва темплейту"
                  name="title"
                  sx={{ display: "block" }}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Опис шаблону"
                  name="description"
                  sx={{ display: "block" }}
                />
              )}
            />

            <Controller
              name="item"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Назва дії"
                  name="item"
                />
              )}
            />

            <Button variant="contained" onClick={onCreateItem}>
              Додати дію
            </Button>
          </form>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h5">Список дій</Typography>

          {questions?.map(({ name, order }) => (
            <Typography key={`${name}-${order}`}>{name}</Typography>
          ))}
        </Grid>
      </Grid>

      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Створити Шаблон
      </Button>
    </>
  );
};
