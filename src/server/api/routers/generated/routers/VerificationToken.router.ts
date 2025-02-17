/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        aggregate: procedure.input($Schema.VerificationTokenInputSchema.aggregate).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.aggregate(input as any))),

        createMany: procedure.input($Schema.VerificationTokenInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.createMany(input as any))),

        create: procedure.input($Schema.VerificationTokenInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.create(input as any))),

        deleteMany: procedure.input($Schema.VerificationTokenInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.deleteMany(input as any))),

        delete: procedure.input($Schema.VerificationTokenInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.delete(input as any))),

        findFirst: procedure.input($Schema.VerificationTokenInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findFirst(input as any))),

        findFirstOrThrow: procedure.input($Schema.VerificationTokenInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findFirstOrThrow(input as any))),

        findMany: procedure.input($Schema.VerificationTokenInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findMany(input as any))),

        findUnique: procedure.input($Schema.VerificationTokenInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findUnique(input as any))),

        findUniqueOrThrow: procedure.input($Schema.VerificationTokenInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findUniqueOrThrow(input as any))),

        groupBy: procedure.input($Schema.VerificationTokenInputSchema.groupBy).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.groupBy(input as any))),

        updateMany: procedure.input($Schema.VerificationTokenInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.updateMany(input as any))),

        update: procedure.input($Schema.VerificationTokenInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.update(input as any))),

        upsert: procedure.input($Schema.VerificationTokenInputSchema.upsert).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.upsert(input as any))),

        count: procedure.input($Schema.VerificationTokenInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.count(input as any))),

    }
    );
}
