import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronLeft, Edit } from "@mui/icons-material";
import { Stepper } from "../../components/steps/Stepper";
import { useNavigate, useParams } from "react-router-dom";
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

export const SingleTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [answers, set$answers] = useState<Answer[]>([]);
  const [questions, set$questions] = useState<Question[]>([]);
  const [isPreview, set$isPreview] = useState(false);
  const [disabledFields, set$disabledFields] = useState({});

  useEffect(() => {
    (async () => {
      const response = await api.post("template/get-questions", { id });

      const disabledFields = response?.data
        .map((item: Question) => ({
          [item.id]: true,
        }))
        .reduce((r, c) => Object.assign(r, c), {});

      set$disabledFields(disabledFields);
      set$questions(response.data);
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question_id: number
  ) => {
    const value = e.target.value;

    const updatedResponses = answers.filter(
      (answer) => answer.question_id !== question_id
    );

    set$answers([...updatedResponses, { text: value, question_id }]);
  };

  const handleSubmit = async () => {
    await api.post("template/add-responses", answers);

    navigate(-1);
  };

  if (!questions.length) return <Typography>No Questions Found</Typography>;

  const renderPreview = () => (
    <>
      {questions
        .sort((a, b) => a.order - b.order)
        .map(({ name, id }) => (
          <Box sx={{ marginY: 3 }} key={id}>
            <Typography sx={{ mb: 1 }}>{name}</Typography>
            <TextField
              sx={{ minWidth: 450 }}
              value={
                answers?.find(({ question_id }) => question_id == id)?.text
              }
              onChange={(e) => handleChange(e, id)}
              disabled={disabledFields[id]}
            />
            <IconButton
              onClick={() =>
                set$disabledFields((prevState) => ({
                  ...prevState,
                  [id]: !prevState?.[id],
                }))
              }
            >
              <Edit />
            </IconButton>
          </Box>
        ))}

      <Button onClick={handleSubmit} variant="contained">
        Відправити
      </Button>
    </>
  );

  return (
    <>
      <Button
        onClick={() => navigate("/templates")}
        color="primary"
        sx={{ marginBottom: 1, fontSize: 14 }}
      >
        <ChevronLeft sx={{ marginRight: 1 }} /> назад до шаблонів
      </Button>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Подумайте про свої щоденні звички
      </Typography>
      <Divider orientation="horizontal" sx={{ marginBottom: 3 }} />

      <Stepper
        steps={questions}
        setTotal={set$answers}
        total={answers}
        set$isPreview={set$isPreview}
      />
    </>
  );
};
