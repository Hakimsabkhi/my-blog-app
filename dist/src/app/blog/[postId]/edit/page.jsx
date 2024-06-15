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
exports.getServerSideProps = void 0;
const react_1 = require("react");
const router_1 = require("next/router");
const db_1 = __importDefault(require("../../../../lib/db"));
const Post_1 = __importDefault(require("../../../../models/Post"));
const EditPost = ({ post }) => {
    const [formData, setFormData] = (0, react_1.useState)({ title: post.title, content: post.content });
    const router = (0, router_1.useRouter)();
    const { postId } = router.query;
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const response = yield fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            router.push(`/blog/${postId}`);
        }
    });
    return (<div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
        </label>
        <label>
          Content:
          <textarea name="content" value={formData.content} onChange={handleChange} required/>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>);
};
const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = context.params;
    yield (0, db_1.default)();
    const post = yield Post_1.default.findById(postId).lean();
    return { props: { post: JSON.parse(JSON.stringify(post)) } };
});
exports.getServerSideProps = getServerSideProps;
exports.default = EditPost;
