import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import { useForm } from "react-hook-form";

interface StepperProps {
  steps:
    | {
        id: number;
        name: string;
        order: number;
        type?: string;
      }[];
  total: any;
  setTotal: any;
}

export const Stepper = ({ steps, total, setTotal }: StepperProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, set$step] = useState(0);
  const [answer, set$answer] = useState("");

  const handlePrev = () => {
    set$step(step - 1);
    set$answer(total[step - 1].text);
  };

  const handleNext = () => {
    set$answer(total[step + 1]?.text ? total[step + 1]?.text : "");

    if (step < steps.length - 1) {
      set$step(step + 1);
    }
  };

  const onBlur = () => {
    const existed = total.find((item) => item.question_id == steps[step].id);
    const shouldUpdate = existed?.text !== answer;

    if (shouldUpdate) {
      setTotal([...total, { text: answer, question_id: steps[step].id }]);
    }
  };

  const handleSubmit = async () => {
    await api.post("notes/create", { total, template_id: id });

    navigate("complete");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {steps
          .sort((a, b) => a.order - b.order)
          .map(({ id }, index) => (
            <Box
              key={id}
              component="div"
              sx={{
                width: "100%",
                height: 4,
                backgroundColor: "#3B3B3B",
                borderRadius: "8px",
                opacity: step == index ? 1 : 0.13,
              }}
            />
          ))}
      </Box>

      <Typography variant="h6" sx={{ marginY: 2 }}>
        {steps?.[step]?.name}
      </Typography>

      <textarea
        value={answer}
        style={{
          width: "100%",
          minHeight: 200,
          padding: 15,
          borderRadius: "8px",
          border: "1px solid #4C50583B",
          resize: "none",
        }}
        onChange={(e) => set$answer(e.target.value)}
        onBlur={onBlur}
      />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
      >
        <Button variant="outlined" onClick={handlePrev} disabled={step == 0}>
          <ChevronLeft />
          Назад
        </Button>

        {step == steps?.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            Відправити
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={answer == ""}
          >
            Далі <ChevronRight />
          </Button>
        )}
      </Box>
    </>
  );
};
