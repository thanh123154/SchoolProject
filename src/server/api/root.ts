import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { ListingRouter } from "./routers/listing";
import { userRouter } from "./routers/user";
import { BookingRouter } from "./routers/booking";
import { CalendarRouter } from "./routers/calendar";
import { TodoRouter } from "./routers/todo";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  listing: ListingRouter,
  user: userRouter,
  booking: BookingRouter,
  calendar: CalendarRouter,
  todo: TodoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
