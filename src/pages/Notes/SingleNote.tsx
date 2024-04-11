import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ButtonBack } from "../../components/buttons/ButtonBack";
import { Edit } from "@mui/icons-material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKLIST } from "../../api/queries";

export const SingleNote = () => {
  const { id } = useParams();
  const [action, set$action] = useState("");
  const [actionsList, set$actionsList] = useState([]);
  const [fields, set$fields] = useState([]);
  const [
    createChecklist,
    { isLoading: isCreatingChecklist, data: createdChecklist, error },
  ] = useMutation(CREATE_CHECKLIST);

  console.log("createdChecklist", createdChecklist);

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      actions: [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
      ],
    },
  });
  const { fields: formFields, insert } = useFieldArray({
    control,
    name: "actions",
  });

  const watchLastAction = watch("actions").slice(-1)[0]?.text;
  useEffect(() => {
    if (watchLastAction?.length > 0) {
      insert(watch("actions").length, { text: "" });
    }
  }, [watchLastAction, insert, watch]);

  const { data, isLoading } = useQuery({
    queryKey: ["my note"],
    queryFn: async () => {
      const response = await api.post(`notes/${id}`);
      const questions = response?.data.template.question;

      const preparedFields = questions.map(({ id, answer }) => {
        return {
          question_id: id,
          disabled: true,
          text: answer[0].text,
          id: answer[0].id,
        };
      });

      set$fields(preparedFields);

      return response.data;
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question_id: number
  ) => {
    const value = e.target.value;

    const filteredAnswers = fields.filter(
      (answer) => answer.question_id !== question_id
    );

    const updatedAnswer = fields.find(
      (answer) => answer.question_id == question_id
    );

    set$fields([...filteredAnswers, { ...updatedAnswer, text: value }]);
  };

  const onSubmit = () => {
    createChecklist({ variables: { note: id } });
  };
  if (isLoading || !data) return <></>;

  return (
    <>
      <ButtonBack />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Typography variant="h3">📝 {data.template.name}</Typography>

        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Завершити
        </Button>
      </Box>
      <Divider orientation="horizontal" />
      <Grid container spacing={5} sx={{ paddingY: 4 }}>
        <Grid item>
          {data.template.question
            .sort((a, b) => a.order - b.order)
            .map(({ name, id, answer }, index) => (
              <Box sx={{ marginBottom: 3, width: "720px" }} key={id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 1,
                  }}
                >
                  <Typography>
                    {`${index + 1}. `} {name}
                  </Typography>

                  <IconButton
                    sx={{ backgroundColor: "#FCFBFA", borderRadius: "16px" }}
                    onClick={() =>
                      set$fields((prevState) => {
                        return prevState.map((item) => {
                          if (item.question_id == id) {
                            return {
                              ...item,
                              disabled: !item.disabled,
                            };
                          } else {
                            return item;
                          }
                        });
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                </Box>
                <TextareaAutosize
                  minRows={3}
                  style={{
                    width: "670px",
                    padding: "12px 24px",
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    border: "1px solid rgba(0, 0, 0, 0.38)",
                    resize: "none",
                  }}
                  value={
                    fields?.find((field) => field?.question_id == id)?.text
                  }
                  onChange={(e) => handleChange(e, id)}
                  disabled={
                    fields.find((field) => field.question_id == id)?.disabled
                  }
                />
              </Box>
            ))}
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: "24px",
              backgroundColor: "#F3EEE5",
              borderRadius: "16px",
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              План Дій
            </Typography>

            {formFields.map((item, index) => (
              <Box key={item?.id}>
                <Controller
                  name={`actions.${index}.text`}
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="span"
                        sx={{
                          position: "absolute",
                          left: 0,
                          bottom: "4px",
                        }}
                      >{`${index + 1}. `}</Box>
                      <TextField
                        {...field}
                        sx={{
                          width: "100%",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.38)",
                          "& fieldset": { border: "none" },
                          "& input.MuiInputBase-input": {
                            paddingBottom: "2px",
                          },
                        }}
                      />
                    </Box>
                  )}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
