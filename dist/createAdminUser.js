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
require("dotenv/config");
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const db_js_1 = __importDefault(require("./src/lib/db.js"));
function createAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_js_1.default)();
        // Your code to create an admin user goes here
        console.log('Admin user created successfully.');
    });
}
createAdminUser().catch((error) => {
    console.error('Error creating admin user:', error);
});
