import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './App.css'
import * as Yup from "yup";
import {Button} from "@mui/material";

interface Todo {
  id: number;
  text: string;
}

const validationSchema = Yup.object().shape({
  text: Yup.string().required(" Task is required")
});

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (data: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      text: data
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <Formik
        initialValues={{ text: "" }}
        validationSchema={validationSchema}
        onSubmit={(list, { resetForm }) => {
          addTodo(list.text);
          resetForm();
        }}
      >
        <Form>
          <Field type="text" name="text" placeholder="Enter the task" />
          <ErrorMessage name="text" component="div" />
          <button type="submit">Add Task</button>
        </Form>
      </Formik>

  {todos.map((item) => (
    
    
        <div key={item.id}>
          {item.text}{" "}
          <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
        </div>
      ))}
      
    </div>
  );
};

export default App;
