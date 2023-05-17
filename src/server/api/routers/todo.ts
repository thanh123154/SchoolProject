import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const TodoRouter = createTRPCRouter({
  getAllTodoByHostId: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
      })
    )
    .query(({ input: { hostId }, ctx }) => {
      return ctx.prisma.todo.findMany({
        where: { hostId },
      });
    }),

  createTodo: protectedProcedure
    .input(
      z.object({
        hostId: z.string(),
        task: z.string(),
        priority: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({ data: { ...input } });
    }),
  updateTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isCompleted: z.boolean().optional(),
        task: z.string().optional(),
        priority: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.todo.delete({
        where: { id: id },
      });
    }),
});
