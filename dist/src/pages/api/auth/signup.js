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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../../lib/db"));
const User_1 = __importDefault(require("../../../models/User"));
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        if (req.method === 'POST') {
            const { username, email, password } = req.body;
            // Check if the user already exists
            const existingUser = yield User_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            // Hash the password
            const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
            // Create a new user
            const newUser = new User_1.default({
                username,
                email,
                password: hashedPassword,
                role: 'Visitor', // Default role
            });
            // Save the new user to the database
            yield newUser.save();
            // Return a successful response
            return res.status(201).json({ success: true });
        }
        else {
            // If the method is not POST, return a 405 Method Not Allowed error
            res.setHeader('Allow', ['POST']);
            return res.status(405).end(`Method ${req.method} not allowed`);
        }
    });
}
exports.default = handler;
