import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query {
    tasks(input: {}) {
      id
      name
      dueDate
      status
      pointEstimate
      tags
      position
      assignee {
        id
        avatar
        fullName
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      dueDate
      name
      pointEstimate
      status
      tags
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;
