"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Blog = () => {
    const [posts, setPosts] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('/api/posts');
                const data = yield response.json();
                setPosts(data);
            }
            catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        });
        fetchPosts();
    }, []);
    return (<div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map(post => (<li key={post._id}>
            <a href={`/blog/${post._id}`}>{post.title}</a>
          </li>))}
      </ul>
    </div>);
};
exports.default = Blog;
