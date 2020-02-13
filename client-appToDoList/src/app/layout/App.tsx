import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IToDoTask } from "../models/toDoTask";
import { NavBar } from "../../features/nav/NavBar";
import { ToDoTaskDashboard } from "../../features/toDoTasks/dashboard/ToDoTaskDashboard";
import agent from "../api/agent";

const App = () => {
  const [toDoTasks, setToDoTasks] = useState<IToDoTask[]>([]);
  const [selectedToDoTask, setSelectedToDoTask] = useState<IToDoTask | null>(
    null
  );

  const handleSelectToDoTask = (id: number) => {
    setSelectedToDoTask(toDoTasks.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedToDoTask(null);
  };

  const handleCreateToDoTask = (toDoTask: IToDoTask) => {
    agent.ToDoTasks.create(toDoTask).then(() => {
      setToDoTasks([...toDoTasks, toDoTask]);
      setSelectedToDoTask(toDoTask);
      loadTasks();
    });
  };

  const handleEditToDoTask = (toDoTask: IToDoTask) => {
    agent.ToDoTasks.update(toDoTask).then(() => {
      let toDoTasksNew = [
        ...toDoTasks.filter(a => a.id !== toDoTask.id),
        toDoTask
      ];
      toDoTasksNew.sort(function(a: IToDoTask, b: IToDoTask) {
        if (a.status === b.status) {
          // Price is only important when cities are the same
          return b.id - a.id;
        }
        return a.status.length > b.status.length ? -1 : 1;
      });
      setToDoTasks(toDoTasksNew);
      setSelectedToDoTask(toDoTask);
    });
  };

  const handleDeleteToDoTask = (id: number) => {
    agent.ToDoTasks.delete(id).then(() => {
      setToDoTasks([...toDoTasks.filter(a => a.id !== id)]);
      setSelectedToDoTask(null);
    });
  };

  const loadTasks = () => {
    agent.ToDoTasks.list().then(response => {
      let toDoTasks: IToDoTask[] = [];
      response.forEach((toDoTask: any) => {
        if (toDoTask.status === 0) toDoTask.status = "NotDone";
        else toDoTask.status = "Done";
        toDoTasks.push(toDoTask);
      });
      toDoTasks.sort(function(a: IToDoTask, b: IToDoTask) {
        if (a.status === b.status) {
          // Price is only important when cities are the same
          return b.id - a.id;
        }
        return a.status.length > b.status.length ? -1 : 1;
      });
      setToDoTasks(toDoTasks);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ToDoTaskDashboard
          toDoTasks={toDoTasks}
          selectToDoTask={handleSelectToDoTask}
          selectedToDoTask={selectedToDoTask}
          setSelectedToDoTask={setSelectedToDoTask}
          createToDoTask={handleCreateToDoTask}
          editToDoTask={handleEditToDoTask}
          deleteToDoTask={handleDeleteToDoTask}
        />
      </Container>
    </Fragment>
  );
};

export default App;
