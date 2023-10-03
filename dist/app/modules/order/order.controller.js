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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_constant_1 = require("./order.constant");
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user information from the decoded token
    const { id } = req.user;
    // Request body containing ordered books
    const { orderedBooks } = req.body;
    // Create the order using the service function
    const order = yield order_service_1.OrderService.createOrder(id, orderedBooks);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Created Successfully',
        data: order,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const filters = (0, pick_1.default)(req.query, order_constant_1.orderFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const userType = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role; // Modify to match your actual user role property
    const userId = userType === 'customer' ? (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId : undefined;
    console.log('user:', userId, userType);
    const result = yield order_service_1.OrderService.getAllOrders(filters, options, userType, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order data Fatched!!',
        meta: result.meta,
        data: result.data,
    });
}));
const getDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const userRole = (_d = req.user) === null || _d === void 0 ? void 0 : _d.role;
    try {
        console.log('result', req.params.id);
        const result = yield order_service_1.OrderService.getDataById(req.params.id);
        if (userRole === 'admin' ||
            (userRole === 'customer' && userId === req.params.id)) {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: 'Order Single data Fatched!!',
                data: result,
            });
        }
        else {
            throw new Error('You are not authorized See This Order Details');
        }
    }
    catch (error) {
        console.error('Error fetching order data:', error);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: false,
            message: 'Access Denied',
        });
    }
}));
exports.OrderController = {
    getDataById,
    createOrder,
    getAllOrders,
};
