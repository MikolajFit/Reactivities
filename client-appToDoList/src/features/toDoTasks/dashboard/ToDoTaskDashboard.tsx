import React from "react";
import { Grid } from "semantic-ui-react";
import { IToDoTask } from "../../../app/models/toDoTask";
import { ToDoTaskList } from "./ToDoTaskList";
import { ToDoTaskForm } from "../form/ToDoTaskForm";

interface IProps {
  selectToDoTask: (id: number) => void;
  selectedToDoTask: IToDoTask | null;
  setSelectedToDoTask: (toDoTask: IToDoTask | null) => void;
  createToDoTask: (toDoTask: IToDoTask) => void;
  editToDoTask: (toDoTask: IToDoTask) => void;
  deleteToDoTask: (id: number) => void;
  toDoTasks: IToDoTask[];
}

export const ToDoTaskDashboard: React.FC<IProps> = ({
  selectToDoTask,
  selectedToDoTask,
  createToDoTask,
  editToDoTask,
  deleteToDoTask,
  toDoTasks
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ToDoTaskList
          editToDoTask={editToDoTask}
          toDoTasks={toDoTasks}
          selectToDoTask={selectToDoTask}
          deleteToDoTask={deleteToDoTask}
        ></ToDoTaskList>
      </Grid.Column>
      <Grid.Column width={6}>
        <ToDoTaskForm
          key={(selectedToDoTask && selectedToDoTask.id) || "0"}
          toDoTask={selectedToDoTask!}
          createToDoTask={createToDoTask}
          editToDoTask={editToDoTask}
        />
      </Grid.Column>
    </Grid>
  );
};
