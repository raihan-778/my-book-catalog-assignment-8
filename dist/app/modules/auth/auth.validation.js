"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
//req-validation
//body--> object
//data--> object
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const signupUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constant_1.userRole], {
            required_error: 'role is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        name: zod_1.z.string({ required_error: 'Name is required' }),
        contactNo: zod_1.z.string({
            required_error: 'contactNo is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        profileImg: zod_1.z.string({
            required_error: 'profileImg is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    signupUserZodSchema,
};
