"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_actions_1 = __importDefault(require("./permissions-actions"));
async function bootstrap({ strapi }) {
    await strapi
        .admin
        .services
        .permission
        .actionProvider
        .registerMany(permissions_actions_1.default.actions);
}
exports.default = bootstrap;
