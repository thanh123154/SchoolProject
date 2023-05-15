import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const TodoRouter = createTRPCRouter({
  getAllTodo: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ ctx, input: { name } }) => {
      return ctx.prisma.listing.findMany({
        where: {
          approved: false,
          name: {
            contains: name,
          },
          active: true,
        },
      });
    }),

  createTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string(),
        priority: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({ data: { ...input } });
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
