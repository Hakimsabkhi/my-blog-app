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
const db_1 = __importDefault(require("../../../lib/db"));
const Post_1 = __importDefault(require("../../../models/Post"));
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        switch (req.method) {
            case 'GET':
                try {
                    const posts = yield Post_1.default.find({});
                    res.status(200).json({ success: true, posts });
                }
                catch (error) {
                    const errorMessage = error.message;
                    res.status(400).json({ success: false, error: errorMessage });
                }
                break;
            default:
                res.status(400).json({ success: false, error: 'Method not allowed' });
                break;
        }
    });
}
exports.default = handler;
