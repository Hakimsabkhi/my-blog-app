"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const PostList = ({ posts }) => {
    return (<div className="space-y-6">
      {posts.map(post => (<div key={post._id} className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-2">
            <link_1.default href={`/blog/${post._id}`}>
              {post.title}
            </link_1.default>
          </h2>
          <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
        </div>))}
    </div>);
};
exports.default = PostList;
