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
exports.UserProfileRoutes = exports.decodeTokenMiddleware = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// import validateRequest from '../../middlewares/validateRequest';
const decodeTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    try {
        // Verify and decode the JWT token
        const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        // Attach user information to the request
        req.user = decodedToken;
        next();
    }
    catch (error) {
        // Handle token verification errors (e.g., token expired, invalid token)
        console.error('Token verification error:', error);
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
});
exports.decodeTokenMiddleware = decodeTokenMiddleware;
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), exports.decodeTokenMiddleware, user_controller_1.UserController.getUserProfile);
exports.UserProfileRoutes = router;
