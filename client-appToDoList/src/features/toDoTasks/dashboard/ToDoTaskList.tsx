import React from "react";
import { Button, Label, Segment, List } from "semantic-ui-react";
import { IToDoTask } from "../../../app/models/toDoTask";

interface IProps {
  toDoTasks: IToDoTask[];
  selectToDoTask: (id: number) => void;
  deleteToDoTask: (id: number) => void;
  editToDoTask: (toDoTask: IToDoTask) => void;
}

export const ToDoTaskList: React.FC<IProps> = ({
  toDoTasks,
  selectToDoTask,
  deleteToDoTask,
  editToDoTask
}) => {
  const ChangeStatus = (toDoTask: IToDoTask) => {
    if (toDoTask.status === "Done") toDoTask.status = "NotDone";
    else toDoTask.status = "Done";
    editToDoTask(toDoTask);
  };

  return (
    <Segment clearing>
      <List relaxed divided>
        {toDoTasks.map(toDoTask => (
          <List.Item key={toDoTask.id}>
            <List.Content>
              <List.Description>
                <Label
                  as="a"
                  onClick={() => ChangeStatus(toDoTask)}
                  color={toDoTask.status === "Done" ? "green" : "red"}
                  ribbon
                  content={toDoTask.status === "Done" ? "Done" : "In progress"}
                />
                <div style={{ paddingTop: "2em" }}>{toDoTask.description}</div>
              </List.Description>
              <List.Description>
                <Button
                  onClick={() => selectToDoTask(toDoTask.id)}
                  floated="right"
                  content="Edit"
                  color="blue"
                ></Button>
                <Button
                  onClick={() => deleteToDoTask(toDoTask.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};
