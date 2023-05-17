import { Box, Checkbox, Flex, Button, LoadingOverlay } from "@mantine/core";
import react, { useEffect, useState } from "react";
import { TodoCard } from "../../layouts/components/TodoCard";
import { IconPencil, IconPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import { CreateTodoModal } from "../../layouts/components/CreateTodoModal";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";

const Dummy_TodoList = [
  {
    task: "Finish essay on the importance of exercise for maintaining a healthy lifestyle",
    priority: "high",
    isCompleted: false,
    uuid: 0,
  },
  {
    task: "Complete project proposal for new client",
    priority: "high",
    isCompleted: true,
    uuid: 1,
  },
  {
    task: "Buy groceries for the week and meal prep for lunches",
    priority: "medium",
    isCompleted: false,
    uuid: 2,
  },
  {
    task: "Schedule appointment with dentist for annual cleaning and check-up",
    priority: "low",
    isCompleted: false,
    uuid: 3,
  },
  {
    task: "Research and book flights for upcoming vacation",
    priority: "medium",
    isCompleted: false,
    uuid: 4,
  },
  {
    task: "Take dog to vet for annual vaccinations and check-up",
    priority: "high",
    isCompleted: false,
    uuid: 5,
  },
  {
    task: "Complete the project proposal document and submit it before the deadline",
    priority: "high",
    isCompleted: true,
    uuid: 7,
  },
];

export const CalendarTodos = () => {
  const [todoList, setTodoList] = useState(Dummy_TodoList);
  const [isEditingTodoList, setIsEditingTodoList] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: session } = useSession();

  const {
    data: userTodo,
    isLoading,
    refetch,
  } = api.todo.getAllTodoByHostId.useQuery(
    { hostId: session?.user?.id || "" },

    { enabled: !!session?.user?.id, refetchOnWindowFocus: false }
  );
  // const deletedCompleted = async () => {
  //   const TodosToDelete = todoList.filter((todo) => todo.isCompleted === true);
  //   console.log(TodosToDelete);
  // };

  useEffect(() => {
    if (userTodo) {
      setTodoList(userTodo);
    }
  }, [userTodo]);

  console.log(userTodo, "data todo");

  const renderTodoList = () => {
    return todoList.map((todo) => {
      return (
        <Box
          key={nanoid()}
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          <LoadingOverlay visible={isLoading} />
          <TodoCard
            refetch={refetch}
            todo={todo}
            isEditingTodo={isEditingTodoList}
          />
        </Box>
      );
    });
  };
  return (
    <>
      <CreateTodoModal
        refetch={refetch}
        opened={opened}
        open={open}
        close={close}
      />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? "#2a2a2b" : "#808080",
          // width: "25%",
        })}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? "#212122" : "#808080",
            padding: "16px",
          })}
        >
          <Flex justify="space-between" align="center">
            <div>To Dos</div>
            <Box sx={{ display: "flex", gap: "8px" }}>
              {/* {isEditingTodoList && (
                <Button
                  sx={{
                    borderRadius: "8px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                  style={{
                    textTransform: "none",
                  }}
                  color="red"
                  uppercase={false}
                  variant="outline"
                  // onClick={() => void deletedCompleted()}
                >
                  Delete Completed
                </Button>
              )} */}
              <Button
                sx={(theme) => ({
                  borderRadius: "8px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                })}
                color="dark"
                variant="subtle"
                //rightIcon={<IconPlus />}
                onClick={() => setIsEditingTodoList(!isEditingTodoList)}
              >
                <IconPencil fill={`${isEditingTodoList ? "gray" : ""}`} />
              </Button>
              <Button
                type="button"
                sx={(theme) => ({
                  borderRadius: "8px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                })}
                color="dark"
                variant="white"
                // rightIcon={<IconPlus />}
                onClick={open}
              >
                <IconPlus />
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          })}
        >
          {renderTodoList()}
        </Box>
      </Box>
    </>
  );
};
