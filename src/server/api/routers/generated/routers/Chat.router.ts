/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.ChatInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).chat.aggregate(input as any))),

        createMany: procedure.input($Schema.ChatInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.createMany(input as any))),

        create: procedure.input($Schema.ChatInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.create(input as any))),

        deleteMany: procedure.input($Schema.ChatInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.deleteMany(input as any))),

        delete: procedure.input($Schema.ChatInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.delete(input as any))),

        findFirst: procedure.input($Schema.ChatInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.ChatInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.ChatInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.findMany(input as any))),

        findUnique: procedure.input($Schema.ChatInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chat.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.ChatInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chat.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.ChatInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).chat.groupBy(input as any))),

        updateMany: procedure.input($Schema.ChatInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.updateMany(input as any))),

        update: procedure.input($Schema.ChatInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.update(input as any))),

        upsert: procedure.input($Schema.ChatInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.upsert(input as any))),

        count: procedure.input($Schema.ChatInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.count(input as any))),

    }
    );
}
