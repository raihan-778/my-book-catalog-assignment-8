"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordMatched = exports.isUserExists = exports.asyncForEach = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array)) {
        throw new Error('Expected an array');
    }
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.asyncForEach = asyncForEach;
const isUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
            role: true,
        },
    });
    return user;
});
exports.isUserExists = isUserExists;
// Prisma equivalent for isPasswordMatched instance method
const isPasswordMatched = (givenPassword, currentPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // return await bcrypt.compare(givenPassword, currentPassword);
    return givenPassword === currentPassword;
});
exports.isPasswordMatched = isPasswordMatched;
