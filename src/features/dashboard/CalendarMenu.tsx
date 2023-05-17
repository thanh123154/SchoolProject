/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Flex, CloseButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus } from "@tabler/icons";
import react, { useState } from "react";
import { CreateScheduleModal } from "../../layouts/components/CreateScheduleModal";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import { showNotification } from "@mantine/notifications";

export const CalendarMenu = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditingCalendarList, setIsEditingCalendarList] = useState(false);

  const { data: session } = useSession();
  const { mutateAsync: apiDelete } = api.calendar.deleteCalendar.useMutation();
  const { mutateAsync: apiDeleteAllSchedule } =
    api.calendar.deleteAllSchedule.useMutation();

  const { mutateAsync: apiDeleteManyTodo } =
    api.todo.deleteManyTodo.useMutation();

  const handleDeleteCalendar = async (event, id) => {
    event.stopPropagation();
    console.log(`deleted ${id}`);

    await apiDeleteAllSchedule({
      CalendarId: `${id}`,
    });

    await apiDelete({
      id: `${id}`,
    });
    props.refetchFunc();
    showNotification({
      color: "green",
      message: "Delete calendar successfully",
    });
  };

  const handleDeleteManyTodo = async (event, id) => {
    event.stopPropagation();
    console.log(`deleted ${id}`);

    await apiDeleteManyTodo({
      CalendarId: `${id}`,
    });

    props.refetchFunc();
    showNotification({
      color: "green",
      message: "Delete calendar successfully",
    });
  };

  const renderCalendars = () => {
    const calendarToRender = props.calendarList.map((calendar, index) => {
      return (
        <Box
          key={index}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? calendar.uuid === props.selectedSchedule?.uuid
                  ? "#3f3f41"
                  : "#2a2a2b"
                : "#808080",
            cursor: "pointer",
            padding: "16px",
            ":hover": {
              backgroundColor:
                theme.colorScheme === "dark" ? "#494949" : "#808080",
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "ease-in-out 250ms",
          })}
          onClick={() => props._setSelectedSchedule(calendar)}
        >
          <Box
            sx={{ minHeight: "28px", display: "flex", alignItems: "center" }}
          >
            {calendar.name}
          </Box>
          {isEditingCalendarList ? (
            <CloseButton
              onClick={(e) => void handleDeleteCalendar(e, calendar.id)}
            />
          ) : (
            <></>
          )}
        </Box>
      );
    });
    return (
      <Box>
        <Flex direction="column">{calendarToRender}</Flex>
      </Box>
    );
  };
  return (
    <>
      <CreateScheduleModal
        refetchFunc={props.refetchFunc}
        opened={opened}
        open={open}
        close={close}
      />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? "#2a2a2b" : "#808080",
          // width: "20%",
          //padding: "16px"
        })}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? "#212122" : "#808080",
            padding: "16px",
          })}
        >
          <Flex justify="space-between" align="center" gap={"32px"}>
            <div>Calendars</div>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Button
                sx={(theme) => ({
                  borderRadius: "8px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                })}
                color="dark"
                variant="subtle"
                //rightIcon={<IconPlus />}
                onClick={() => setIsEditingCalendarList(!isEditingCalendarList)}
              >
                <IconPencil fill={`${isEditingCalendarList ? "gray" : ""}`} />
              </Button>
              <Button
                type="button"
                sx={(theme) => ({
                  borderRadius: "8px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                })}
                style={{
                  textTransform: "none",
                }}
                color="dark"
                variant="white"
                onClick={open}
              >
                Create
              </Button>
            </Box>
          </Flex>
        </Box>
        {renderCalendars()}
      </Box>
    </>
  );
};
