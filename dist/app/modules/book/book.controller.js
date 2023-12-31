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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookData = __rest(req.body, []);
    const result = yield book_service_1.BookService.insertIntoDB(BookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Inserted Successfully',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    // console.log('Filters:', filters);
    // console.log('Options:', options);
    const result = yield book_service_1.BookService.getAllFromDB(filters, options);
    console.log(req.params);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book data Fatched!!',
        meta: result.meta,
        data: result.data,
    });
}));
const getDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getDataById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Single data Fatched!!',
        data: result,
    });
}));
// const getDataByCategoryId = catchAsync(async (req: Request, res: Response) => {
//   try {
//     const categoryId = req.params.id;
//     const result = await BookService.getDataByCategoryId(categoryId);
//     console.log('result', result);
//     if (result?.length === 0) {
//       // No books found for the specified category
//       return sendResponse<Book[]>(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: 'No books found for the specified category',
//         data: [],
//       });
//     }
//     sendResponse<Book[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Books retrieved successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.error('Error retrieving books by category:', error);
//     sendResponse<Book[]>(res, {
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: 'Internal server error',
//       data: [],
//     });
//   }
// });
const getDataByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const categoryId = req.params.id;
        const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
        const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield book_service_1.BookService.getDataByCategoryId(categoryId, filters, options);
        console.log('result', result);
        if (((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            // No books found for the specified category
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: 'No books found for the specified category',
                data: [],
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Books retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        console.error('Error retrieving books by category:', error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: 'Internal server error',
            data: [],
        });
    }
}));
const updateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.BookService.updateIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Data Updated Successfully!!',
        data: result,
    });
}));
const deleteDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.BookService.deleteDataById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Data Deleted Successfully!!',
        data: result,
    });
}));
exports.BookController = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateIntoDB,
    deleteDataById,
    getDataByCategoryId,
};
