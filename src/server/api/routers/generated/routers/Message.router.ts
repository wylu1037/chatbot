/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.MessageInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).message.aggregate(input as any))),

        createMany: procedure.input($Schema.MessageInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.createMany(input as any))),

        create: procedure.input($Schema.MessageInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.create(input as any))),

        deleteMany: procedure.input($Schema.MessageInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.deleteMany(input as any))),

        delete: procedure.input($Schema.MessageInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.delete(input as any))),

        findFirst: procedure.input($Schema.MessageInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).message.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.MessageInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).message.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.MessageInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).message.findMany(input as any))),

        findUnique: procedure.input($Schema.MessageInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).message.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.MessageInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).message.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.MessageInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).message.groupBy(input as any))),

        updateMany: procedure.input($Schema.MessageInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.updateMany(input as any))),

        update: procedure.input($Schema.MessageInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.update(input as any))),

        upsert: procedure.input($Schema.MessageInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).message.upsert(input as any))),

        count: procedure.input($Schema.MessageInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).message.count(input as any))),

    }
    );
}
