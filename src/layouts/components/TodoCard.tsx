/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Checkbox, Flex } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import react, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { showNotification } from "@mantine/notifications";

export const TodoCard = (props) => {
  const [priorityColor, setPriorityColor] = useState("");
  const [isChecked, setIsChecked] = useState(props.todo.isCompleted);
  const { mutateAsync: apiUpdate } = api.todo.updateTodo.useMutation();
  const { mutateAsync: apiDelete } = api.todo.deleteTodo.useMutation();

  useEffect(() => {
    if (props.todo.isCompleted) {
      setPriorityColor("#549138");
    } else {
      switch (props.todo.priority) {
        case "high":
          setPriorityColor("#681414");
          break;
        case "medium":
          setPriorityColor("#a36c2d");
          break;
        case "low":
          setPriorityColor("#141414");
          break;
      }
    }
  }, [props.todo.isCompleted]);

  const handleDeleteTodo = async () => {
    // const data = {
    // 	isCompleted: isCheck,
    //   };
    await apiDelete({
      id: props.todo.id,
      // ...data,
    });

    showNotification({
      color: "green",
      message: "delete todo successfully",
    });
    props.refetch();
  };

  const handleUpdateTodo = async (isCheck) => {
    const data = {
      isCompleted: isCheck,
    };
    await apiUpdate({
      id: props.todo.id,
      ...data,
    });

    showNotification({
      color: "green",
      message: "update todo successfully",
    });
    props.refetch();
  };
  console.log(props.todo.isCompleted, "check bõx");
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        padding: "12px 8px",
        borderRadius: "8px",
        color: "white",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor:
          theme.colorScheme === "dark" ? priorityColor : "#808080",
      })}
    >
      <div>{props.todo.task}</div>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={props.todo.isCompleted}
          onChange={(event) =>
            void handleUpdateTodo(event.currentTarget.checked)
          } //Todo: make a function, update database when check, when processing change checkbox to loading
        />
        {props.isEditingTodo ? (
          <IconTrash
            width={"20px"}
            height={"20px"}
            cursor={"pointer"}
            onClick={() => void handleDeleteTodo()}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
