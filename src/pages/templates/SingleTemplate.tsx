import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ArrowDownward, Check } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconSmile from "../../assets/smile.svg";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { api } from "../../api";
import { motion } from "framer-motion";

interface Question {
  id: number;
  name: string;
  type: any;
}

interface Answer {
  text: string;
  question_id: number;
}

export const SingleTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const entityPath = useMemo(() => {
    return location.pathname.includes("templates") ? "template" : "notes";
  }, [location]);

  const { data: workout, isLoading } = useQuery({
    queryKey: "get template info",
    queryFn: async () => {
      const response = await api.post(`${entityPath}/${id}`, { id });

      const workout = response?.data?.template
        ? response?.data?.template
        : response.data;

      const answers = workout?.question
        ?.sort((a, b) => a?.order - b?.order)
        ?.map(({ id, questionAnswer }) => ({
          text: questionAnswer?.answer?.text || "",
          answer_id: questionAnswer?.answer?.id || "",
          question_id: id || "",
        }));

      setValue("answers", answers);

      return workout;
    },
  });

  const { control, watch, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      answers: [{ text: "", question_id: "", answer_id: "" }],
    },
  });
  const { fields, insert } = useFieldArray({
    control,
    name: "answers",
  });

  const watchedFields = watch("answers");

  const onSubmit = async (data) => {
    navigate("/");
  };

  const handleBlur = async (value, question_id) => {
    const values = getValues("answers");

    const question = workout.question.find((q) => q.id == question_id);
    const filtered = values.filter((item) => item.question_id !== question_id);

    const saveAnswer = await api.post("answer/create", {
      id: question.questionAnswer?.answer?.id || undefined,
      text: value,
      note: id,
      question: question_id,
    });

    setValue("answers", [
      ...[
        {
          text: value,
          question_id,
          answer_id: saveAnswer?.data?.id,
        },
      ],
      ...filtered,
    ]);
  };

  const handleStart = async () => {
    const createdNote = await api.post(`notes/create`, { id });

    if (createdNote?.data?.id) {
      navigate(`/notes/${createdNote?.data?.id}`);
    }
  };

  if (isLoading || !workout || watchedFields.length < 2)
    return <CircularProgress />;

  return (
    <Box
      sx={{
        padding: "24px 0 0",
        flexWrap: "nowrap",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="scroll-box"
        sx={{ paddingX: "10px", height: 1200, overflow: "auto" }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
          {workout.name}
        </Typography>

        <Box sx={{ margintop: "40px" }}>
          <Typography sx={{ textTransform: "uppercase" }}>
            Опис практики
          </Typography>
          <Typography sx={{ marginY: "24px" }}>
            {workout.description}
          </Typography>

          <Divider orientation="horizontal" sx={{ marginBottom: 6 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {workout.question
              ?.sort((a, b) => a.order - b.order)
              .map((step, index) => (
                <Box key={`${step.id}-${index}`}>
                  <Accordion
                    square
                    defaultExpanded={entityPath !== "template" && index == 0}
                    sx={{
                      borderRadius: "16px",
                      background: "transparent",
                      boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        entityPath !== "template" && <ArrowDownward />
                      }
                      disabled={entityPath == "template"}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {getValues("answers").find(
                          (answer) => answer.question_id == step.id
                        )?.text && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Chip
                              label="Виконано"
                              variant="filled"
                              sx={{
                                borderRadius: "8px",
                                alignSelf: "flex-start",
                                transition: "ease-in 0.3s",
                              }}
                              icon={<Check />}
                            />
                          </motion.div>
                        )}
                        <Typography fontWeight="bold" sx={{ marginTop: 1 }}>
                          {index + 1}. {step.name}
                        </Typography>

                        <Typography>{step.description}</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {step.advice && (
                        <Box
                          sx={{
                            borderLeft: "4px solid #4E4E4E",
                            paddingLeft: 2,
                            marginBottom: 3,
                          }}
                        >
                          <Typography sx={{ paddingY: "10px" }}>
                            <span style={{ fontWeight: "bold" }}>Порада! </span>
                            {step.advice}
                          </Typography>
                        </Box>
                      )}

                      {step.example && (
                        <Box
                          sx={{
                            padding: "8px 16px",
                            backgroundColor: "#F4F4F4",
                            borderRadius: "16px",
                          }}
                        >
                          <Typography fontWeight="bold">Приклад</Typography>
                          <Typography>{step.example}</Typography>
                        </Box>
                      )}

                      <Controller
                        name={`answers.${index}.text`}
                        control={control}
                        render={({ field }) => (
                          <TextareaAutosize
                            {...field}
                            onBlur={(e) => handleBlur(e.target.value, step.id)}
                            placeholder="почніть писати"
                            style={{
                              width: "-webkit-fill-available",
                              minHeight: "120px",
                              background: "transparent",
                              borderRadius: "16px",
                              padding: "16px",
                              marginTop: "24px",
                            }}
                          />
                        )}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>

      <Divider flexItem orientation="vertical" sx={{ marginX: 4 }} />

      <Box sx={{ minWidth: "240px", maxWidth: "240px" }}>
        {entityPath == "notes" ? (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Завершити практику
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleStart}
          >
            Почати практику
          </Button>
        )}

        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.38)",
            borderRadius: "8px",
            padding: 3,
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img width="24" height="24" src={IconSmile} />

          <Typography fontSize={14} fontWeight={300} color="#7D7D7D">
            {workout.how_it_works}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
