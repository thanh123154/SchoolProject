/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Button, CloseButton, Modal, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../utils/api";
import { showNotification } from "@mantine/notifications";

export const CreateScheduleModal = (props) => {
  const [scheduleName, setScheduleName] = useState("");
  const { data: session } = useSession();
  const { mutateAsync: apiCreate } = api.calendar.createCalendar.useMutation();

  const handleCreateNewSchedule = async (scheduleName: string) => {
    if (!scheduleName) return;

    console.log(scheduleName);
    const createCalendarData = {
      name: scheduleName,
    };
    await apiCreate({
      hostId: session?.user?.id || "",
      ...createCalendarData,
    });

    showNotification({
      color: "green",
      message: "Create calendar successfully",
    });
    props.refetchFunc();
    props.close();
    setScheduleName("");
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title="Create New Schedule"
      centered
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextInput
          value={scheduleName}
          onChange={(event) => setScheduleName(event.currentTarget.value)}
          placeholder="Schedule Name..."
          rightSection={
            scheduleName && <CloseButton onClick={() => setScheduleName("")} />
          }
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={(theme) => ({
              borderRadius: "8px",
              paddingLeft: "8px",
              paddingRight: "8px",
            })}
            color="dark"
            variant="white"
            onClick={() => void handleCreateNewSchedule(scheduleName)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
