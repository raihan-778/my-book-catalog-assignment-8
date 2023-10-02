"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
//req-validation
//body--> object
//data--> object
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z
            .enum([...user_constant_1.userRole], {
            required_error: 'role is required',
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'password is required',
        })
            .optional(),
        name: zod_1.z.string({ required_error: 'firstName is required' }).optional(),
    })
        .optional(),
    contactNo: zod_1.z
        .string({
        required_error: 'Contact No is required',
    })
        .optional(),
    address: zod_1.z.string({ required_error: 'address is required' }).optional(),
});
exports.UserValidation = {
    updateUserZodSchema,
};
