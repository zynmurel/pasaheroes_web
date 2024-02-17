import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vehicleTypeRouter = createTRPCRouter({
  createVehicleType: publicProcedure
    .input(
      z.object({
        vehicleType: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const vehicleType = ctx.prisma.vehicleType.create({
        data: {
          vehicleType: input.vehicleType,
        },
      });
      return vehicleType;
    }),

  getAllvehicleTypes: publicProcedure
    .input(
      z.object({
        searchText: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.vehicleType.findMany({
        where: {
          vehicleType: {
            contains: input.searchText,
            mode: "insensitive",
          },
        },
        include: {
          Driver: true,
        },
      });
    }),
  deleteVehicleType: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vehicleType.delete({
        where: {
          id: input.id,
        },
      });
    }),
  editvehicleType: publicProcedure
    .input(
      z.object({
        id: z.number(),
        vehicleType: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vehicleType.update({
        where: {
          id: input.id,
        },
        data: {
          vehicleType: input.vehicleType,
        },
      });
    }),
});