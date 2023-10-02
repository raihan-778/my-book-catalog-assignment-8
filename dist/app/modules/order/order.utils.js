"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTokenMiddleware = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const decodeTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    // Verify and decode the JWT here, and attach the user information to req.user
    // You can use libraries like 'jsonwebtoken' for this purpose
    // Assuming the token is in the 'Authorization' header
    // Verify and decode the token here
    // ...
    // Attach user information to the request
    req.user = verifyToken; // Replace with the decoded token
    next();
};
exports.decodeTokenMiddleware = decodeTokenMiddleware;
