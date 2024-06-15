"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const client_layout_1 = __importDefault(require("./client-layout"));
const PostList_1 = __importDefault(require("../components/PostList"));
const react_2 = require("next-auth/react");
const HomePage = () => {
    var _a, _b, _c;
    const { data: session } = (0, react_2.useSession)();
    const [posts, setPosts] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch('/api/posts');
            const data = yield response.json();
            setPosts(data.posts);
        });
        fetchPosts();
    }, []);
    return (<client_layout_1.default>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to My Blog</h1>
        {session ? (<div className="text-center mb-4">
            <h2 className="text-2xl">Hello, {((_a = session.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = session.user) === null || _b === void 0 ? void 0 : _b.email)}!</h2>
            <p>You are signed in as {(_c = session.user) === null || _c === void 0 ? void 0 : _c.email}</p>
          </div>) : (<div className="text-center mb-4">
            <p>Please sign in to access more features.</p>
          </div>)}
        <PostList_1.default posts={posts}/>
      </div>
    </client_layout_1.default>);
};
exports.default = HomePage;
