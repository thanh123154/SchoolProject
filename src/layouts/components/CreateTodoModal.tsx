/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Box,
  Button,
  CloseButton,
  Modal,
  Paper,
  TextInput,
  Select,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import react, { useState } from "react";
import { api } from "../../utils/api";
import { showNotification } from "@mantine/notifications";

export const CreateTodoModal = (props) => {
  const [todoTask, setTodoTask] = useState("");
  const [todoPriority, setTodoPriority] = useState("");

  const { data: session } = useSession();
  const { mutateAsync: apiCreate } = api.todo.createTodo.useMutation();
  const handleCreateNewTodo = async () => {
    if (!todoTask) return;

    console.log({
      todoTask,
      todoPriority: todoPriority || "low",
    });
    const createCalendarData = {
      task: todoTask,
      priority: todoPriority || "low",
      isCompleted: false,
    };
    await apiCreate({
      hostId: session?.user?.id || "",
      ...createCalendarData,
    });

    showNotification({
      color: "green",
      message: "Create todo successfully",
    });
    props.close();
    setTodoTask("");
    setTodoPriority("");
    props.refetch();
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title="Create New Todo"
      centered
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridGap: "8px",
            gridTemplateColumns: "1fr 30%",
          }}
        >
          <TextInput
            value={todoTask}
            onChange={(event) => setTodoTask(event.currentTarget.value)}
            placeholder="Todo Task..."
            rightSection={
              todoTask && <CloseButton onClick={() => setTodoTask("")} />
            }
          />
          <Select
            placeholder="Priority"
            data={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
            value={todoPriority}
            onChange={setTodoPriority}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={(theme) => ({
              borderRadius: "8px",
              paddingLeft: "8px",
              paddingRight: "8px",
            })}
            color="dark"
            variant="white"
            onClick={() => void handleCreateNewTodo()}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
