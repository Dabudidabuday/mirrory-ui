import { gql } from "@apollo/client";

export const CREATE_CHECKLIST = gql`
  mutation CreateChecklist($note: String!) {
    createChecklist(note: $note) {
      id
    }
  }
`;
