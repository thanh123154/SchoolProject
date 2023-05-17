/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Paper } from "@mantine/core";
import react, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  Agenda,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { api } from "../../utils/api";
import moment from "moment";
import { nanoid } from "nanoid";
import { showNotification } from "@mantine/notifications";

export const CalendarScheduler = (props) => {
  const [scheduleData, setScheduleData] = useState(
    props.selectedSchedule?.data
  );

  useEffect(() => {
    setScheduleData(props.selectedSchedule?.data);
  }, [props.selectedSchedule?.data]);

  const { mutateAsync: apiCreateSchedule } =
    api.calendar.createSchedule.useMutation();

  const { mutateAsync: apiUpdateSchedule } =
    api.calendar.updateSchedule.useMutation();

  const { mutateAsync: apiDelete } = api.calendar.deleteSchedule.useMutation();

  const handleScheduleChange = async (event) => {
    if (event.requestType == "dateNavigate") return;
    console.log(event, "event");

    if (
      event.changedRecords?.length === 0 &&
      event.addedRecords?.length === 0
    ) {
      const createScheduleData = event.data[0];
      const createScheduleData2 = event.deletedRecords[0];

      await apiDelete({
        id: `${
          !!createScheduleData ? createScheduleData.id : createScheduleData2.id
        }`,
      });

      showNotification({
        color: "green",
        message: "Delete schedule successfully",
      });
      props.refetchFunc();
    }

    if (event.changedRecords?.length > 0) {
      console.log({ changedRecords: event.changedRecords });
      const createScheduleData = event.changedRecords[0];
      console.log(createScheduleData, "update data");
      const data = {
        id: `${createScheduleData.id}`,
        EndTime: createScheduleData.EndTime,
        StartTime: createScheduleData.StartTime,
        Subject: createScheduleData.Subject,
        IsAllDay: createScheduleData.IsAllDay,
        // StartTimezone: createScheduleData.StartTimezone || moment().toDate(),
        // EndTimezone: createScheduleData.EndTimezone || moment().toDate(),
        Description: createScheduleData.Description || "",
        RecurrenceRule:
          createScheduleData.RecurrenceRule ||
          "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;",
        Guid: createScheduleData.Guid || "",
        RecurrenceID: createScheduleData.RecurrenceID || createScheduleData.Id,
        RecurrenceException:
          createScheduleData.RecurrenceException || "20230509T200000Z",
        FollowingID: createScheduleData.FollowingID || nanoid(),
      };
      await apiUpdateSchedule({
        ...data,
      });
      showNotification({
        color: "green",
        message: "Update schedule successfully",
      });
      props.refetchFunc();
    }
    if (
      event.addedRecords?.length > 0 &&
      props.selectedSchedule.id &&
      event.changedRecords?.length === 0
    ) {
      const createScheduleData = event.addedRecords[0];
      console.log({ addedRecords: event.addedRecords }, "addedRecords");

      const data = {
        // id: Math.round(Math.random() * 1000000),
        EndTime: createScheduleData.EndTime,
        StartTime: createScheduleData.StartTime,
        Subject: createScheduleData.Subject,
        IsAllDay: createScheduleData.IsAllDay,
        // StartTimezone: createScheduleData.StartTimezone || moment().toDate(),
        // EndTimezone: createScheduleData.EndTimezone || moment().toDate(),
        Description: createScheduleData.Description || "",
        RecurrenceRule:
          createScheduleData.RecurrenceRule ||
          "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;",
        Guid: createScheduleData.Guid || "",
        RecurrenceID: createScheduleData.RecurrenceID || createScheduleData.Id,
        RecurrenceException:
          createScheduleData.RecurrenceException || "20230509T200000Z",
        FollowingID: createScheduleData.FollowingID || nanoid(),
      };
      await apiCreateSchedule({
        CalendarId: props.selectedSchedule.id,
        ...data,
      });
      showNotification({
        color: "green",
        message: "Create schedule successfully",
      });
      props.refetchFunc();
    }
  };

  const eventSettings = {
    dataSource: scheduleData,
  };

  // console.log(props.selectedSchedule, "data schedule");
  return (
    <ScheduleComponent
      actionComplete={(e) => void handleScheduleChange(e)}
      dragStop={(e) => console.log(e, "drag complete")}
      eventSettings={eventSettings}
      allowDragAndDrop={true}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
    </ScheduleComponent>
  );
};
