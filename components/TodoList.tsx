// components/TodoList.tsx
"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Heading, Divider, Button, Table, TableRow, TableCell } from '@aws-amplify/ui-react';
// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"][]>([]);

  async function listTodos() {
    // fetch all todos
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <div>
      <Heading level={1}>Todos</Heading>
      <Divider />
      <Button onClick={async () => {
        // create a new Todo with the following attributes
        const { errors, data: newTodo } = await client.models.Todo.create({
          // prompt the user to enter the title
          content: window.prompt("title"),
          done: false,
          priority: 'medium'
        })
        console.log(errors, newTodo);
      }}>Create </Button>

      <Table
        caption=""
        highlightOnHover={false}>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.content}</TableCell>
          </TableRow>
      ))}
      </Table>
    </div>
  );
}
