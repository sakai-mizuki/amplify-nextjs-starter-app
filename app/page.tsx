// app/page.tsx
"use client";

import { Divider, Heading, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import TodoList from "@/components/TodoList";

function App() {
  return (
    <>
      <Heading level={1}>Hello, Amplify 👋</Heading>
      <Divider />
      <TodoList />
    </>
  );
}

export default withAuthenticator(App);
