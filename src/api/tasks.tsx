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
        email
        avatar
        fullName
        createdAt
        updatedAt
        type
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

export const EDIT_TASK = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      dueDate
      id
      name
      pointEstimate
      status
      tags
      
    }
  }
`;
