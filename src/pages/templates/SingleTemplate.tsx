import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ArrowDownward, Check } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import IconSmile from "../../assets/smile.svg";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { api } from "../../api";

interface Question {
  id: number;
  name: string;
  type: any;
}

interface Answer {
  text: string;
  question_id: number;
}

// const workout = {
//   id: "24t23235235235235235",
//   name: "Негативна візуалізація",
//   description:
//     "Негативна візуалізація — це практика уявлення негативних ситуацій чи подій з метою приготування себе до можливих викликів або стресових ситуацій у майбутньому. Ця практика базується на принципі психології, який стверджує, що уявлення негативних сценаріїв може зменшити психологічний стрес, оскільки дозволяє підготувати реакцію на непередбачувані обставини. ",
//   how_it_works:
//     "Уявлення негативних сценаріїв допомагає зменшити вплив стресу та тривоги, оскільки дозволяє розглянути можливі проблеми заздалегідь та розробити план дій для їх вирішення. Ця практика допомагає вам навчитися керувати своїми емоціями та реагувати більш ефективно на стресові ситуації.",
//   steps: [
//     {
//       name: "Вибір ситуації",
//       description:
//         "Виберіть конкретну ситуацію або подію, яку ви хочете візуалізувати.",
//       advice:
//         "Оберіть ситуацію, яка викликає у вас стрес, але не будьте занадто суворими з собою. Оберіть щось, що є реалістичним і потенційно можливим.",
//       example:
//         "ситуація, де ви отримуєте важке повідомлення від керівництва про можливий перегляд вашої роботи.",
//       order: "0",
//       isComplete: true,
//     },
//     {
//       name: "Уявлення ситуації",
//       description: "Уявіть собі цю ситуацію якнайреалістичніше.",
//       advice:
//         "Спробуйте відчути всі деталі та емоції, пов'язані з цією ситуацією.",
//       example:
//         "Перед вами стоїть кабінет керівника, ви бачите його вираз обличчя, відчуваєте важкий атмосферу кімнати.",
//       order: "1",
//       isComplete: false,
//     },
//     {
//       name: "Уявлення ситуації",
//       description: "Уявіть собі цю ситуацію якнайреалістичніше.",
//       advice:
//         "Спробуйте відчути всі деталі та емоції, пов'язані з цією ситуацією.",
//       example:
//         "Перед вами стоїть кабінет керівника, ви бачите його вираз обличчя, відчуваєте важкий атмосферу кімнати.",
//       order: "2",
//       isComplete: false,
//     },
//   ],
// };

export const SingleTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: workout, isLoading } = useQuery({
    queryKey: "get template info",
    queryFn: async () => {
      const response = await api.post("template/:id", { id });

      return response.data;
    },
  });

  console.log("workout", workout);

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      answers: [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
      ],
    },
  });
  const { fields, insert } = useFieldArray({
    control,
    name: "answers",
  });

  if (isLoading) return <></>;

  return (
    <Box
      sx={{
        padding: "24px 0 0",

        flexWrap: "nowrap",
        display: "flex",
        justifyContent: "space-between",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box sx={{ paddingX: "10px", overflow: "auto" }}>
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
            {workout.question.map((step, index) => (
              <>
                <Accordion
                  key={step.id}
                  square
                  sx={{
                    borderRadius: "16px",
                    background: "transparent",
                    boxShadow: "1px 1px 24px 0px rgba(100, 100, 100, 0.10)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {step.isComplete && (
                        <Chip
                          label="Виконано"
                          variant="filled"
                          sx={{ borderRadius: "8px", alignSelf: "flex-start" }}
                          icon={<Check />}
                        />
                      )}
                      <Typography fontWeight="bold" sx={{ marginTop: 1 }}>
                        {index + 1}. {step.name}
                      </Typography>

                      <Typography>{step.description}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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

                    <Controller
                      name={`answers.${index}.text`}
                      control={control}
                      render={({ field }) => (
                        <TextareaAutosize
                          {...field}
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
              </>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider flexItem orientation="vertical" sx={{ marginX: 4 }} />

      <Box sx={{ minWidth: "240px", maxWidth: "240px" }}>
        <Button variant="contained" fullWidth>
          Завершити практику
        </Button>

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
