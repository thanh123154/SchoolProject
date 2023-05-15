import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const CalendarRouter = createTRPCRouter({
  getAllCalendar: protectedProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.calendar.findMany({
      include: {
        schedule: true,
      },
    });
  }),

  createCalendar: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        calendarId: z.string(),
        Subject: z.string(),
        StartTime: z.date(),
        EndTime: z.date(),
        IsAllDay: z.boolean(),
        StartTimezone: z.date(),
        EndTimezone: z.date(),
        Description: z.string(),
        RecurrenceRule: z.string(),
        Guid: z.string(),
        RecurrenceID: z.number(),
        RecurrenceException: z.string(),
        FollowingID: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.schedule.create({ data: { ...input } });
    }),

  updateSchedule: protectedProcedure
    .input(
      z.object({
        calendarId: z.string(),
        Subject: z.string().optional(),
        StartTime: z.date().optional(),
        EndTime: z.date().optional(),
        IsAllDay: z.boolean().optional(),
        StartTimezone: z.date().optional(),
        EndTimezone: z.date().optional(),
        Description: z.string().optional(),
        RecurrenceRule: z.string().optional(),
        Guid: z.string().optional(),
        RecurrenceID: z.number().optional(),
        RecurrenceException: z.string().optional(),
        FollowingID: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.schedule.update({
        where: { id: input.calendarId },
        data: input,
      });
    }),

  deleteCalendar: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.calendar.delete({
        where: { id: id },
      });
    }),

  deleteSchedule: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.schedule.delete({
        where: { id: id },
      });
    }),
});
