import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IToDoTask } from "../../../app/models/toDoTask";

interface IProps {
  toDoTask: IToDoTask;
  createToDoTask: (toDoTask: IToDoTask) => void;
  editToDoTask: (toDoTask: IToDoTask) => void;
}
export const ToDoTaskForm: React.FC<IProps> = ({
  toDoTask: initialFormState,
  createToDoTask,
  editToDoTask
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: 0,
        description: "",
        status: "NotDone"
      };
    }
  };
  const [toDoTask, setToDoTask] = useState<IToDoTask>(initializeForm);

  const handleSubmit = () => {
    if (toDoTask.id === 0) {
      let newToDoTask = {
        ...toDoTask
      };
      createToDoTask(newToDoTask);
    } else {
      editToDoTask(toDoTask);
    }
  };

  const handleInputChange = (event: { target: any }, result: any) => {
    const { name, value } = result || event.target;
    setToDoTask({ ...toDoTask, [name]: value });
  };

  const statusOptions = [
    { key: "0", value: "NotDone", text: "Not Done" },
    { key: "1", value: "Done", text: "Done" }
  ];

  return (
    <Segment clearing>
      <Form>
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={toDoTask.description}
        />
        <Form.Dropdown
          onChange={handleInputChange}
          options={statusOptions}
          name="status"
          placeholder="status"
          value={toDoTask.status}
        />
        <Button
          onClick={() => handleSubmit()}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
      </Form>
    </Segment>
  );
};
