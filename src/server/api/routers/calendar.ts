import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const CalendarRouter = createTRPCRouter({
  getAllCalendarByHostId: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
      })
    )
    .query(({ input: { hostId }, ctx }) => {
      return ctx.prisma.calendar.findMany({
        where: { hostId },
        include: {
          schedule: true,
        },
      });
    }),

  createCalendar: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.calendar.create({ data: { ...input } });
    }),

  createSchedule: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        CalendarId: z.string(),
        Subject: z.string(),
        StartTime: z.date(),
        EndTime: z.date(),
        IsAllDay: z.boolean(),
        Location: z.string().optional(),
        StartTimezone: z.date().optional(),
        EndTimezone: z.date().optional(),
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
        id: z.string(),
        CalendarId: z.string().optional(),
        Subject: z.string().optional(),
        StartTime: z.date().optional(),
        EndTime: z.date().optional(),
        IsAllDay: z.boolean().optional(),
        Location: z.string().optional(),
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
        where: { id: input.id },
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

  deleteAllSchedule: protectedProcedure
    .input(
      z.object({
        CalendarId: z.string(),
      })
    )
    .mutation(({ ctx, input: { CalendarId } }) => {
      return ctx.prisma.schedule.deleteMany({
        where: { CalendarId: CalendarId },
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
