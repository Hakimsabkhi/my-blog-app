"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const PostForm = ({ onSubmit }) => {
    const [title, setTitle] = (0, react_1.useState)('');
    const [content, setContent] = (0, react_1.useState)('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, content);
        setTitle('');
        setContent('');
    };
    return (<form onSubmit={handleSubmit} className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">Content</label>
        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>);
};
exports.default = PostForm;
