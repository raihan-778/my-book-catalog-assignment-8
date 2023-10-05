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
exports.OrderService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./../book/book.constant");
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create the order in the database
        const order = yield prisma_1.default.order.create({
            data: {
                userId,
                orderedBooks: {
                    create: orderedBooks.map(({ bookId, quantity }) => ({
                        bookId,
                        quantity,
                    })),
                },
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                        orderId: false,
                    },
                },
            },
        });
        return order;
    }
    catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
});
const getAllOrders = (filters, options, userType, // Add userType as a parameter
userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters;
    // console.log('ac_service', searchTerm);
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (userType === 'customer' && userId) {
        andConditions.push({
            userId, // Filter by the user's ID
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        // where: andConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'asc',
            },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                    orderId: false,
                },
            },
        },
    });
    const total = yield prisma_1.default.order.count();
    const totalPage = Math.ceil(total / 10);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                    orderId: false,
                },
            },
        },
    });
    return result;
});
exports.OrderService = {
    getDataById,
    createOrder,
    getAllOrders,
};
