"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
//req-validation
//body--> object
//data--> object
// userId
// status
// createdAt
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is required' }),
        status: zod_1.z.enum([...order_constant_1.orderStatus], {
            required_error: 'Status is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...order_constant_1.orderStatus], {
            required_error: 'Status is required',
        })
            .optional(),
    }),
});
exports.OrderValidation = {
    create,
    update,
};
