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
const react_2 = require("next-auth/react");
const navigation_1 = require("next/navigation");
const SignIn = () => {
    const [credentials, setCredentials] = (0, react_1.useState)({ email: '', password: '' });
    const [error, setError] = (0, react_1.useState)(null);
    const router = (0, navigation_1.useRouter)();
    const handleChange = (e) => {
        setCredentials(Object.assign(Object.assign({}, credentials), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setError(null); // Clear any previous errors
        const result = yield (0, react_2.signIn)('credentials', {
            redirect: false,
            email: credentials.email,
            password: credentials.password,
        });
        if (result === null || result === void 0 ? void 0 : result.ok) {
            router.push('/');
        }
        else {
            setError('Failed to sign in. Please check your credentials and try again.');
        }
    });
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        {error && (<div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>)}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" name="email" value={credentials.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
            <button type="button" onClick={() => (0, react_2.signIn)('google', { callbackUrl: '/' })} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In with Google
            </button>
          </div>
        </form>
      </div>
    </div>);
};
exports.default = SignIn;
