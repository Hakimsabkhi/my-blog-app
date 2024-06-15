"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const react_2 = require("next-auth/react");
const ClientLayout = ({ children }) => {
    var _a, _b;
    const { data: session } = (0, react_2.useSession)();
    return (<div>
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <div>
            <link_1.default href="/" className="text-2xl font-bold">
              My Blog
            </link_1.default>
          </div>
          <div className="space-x-4">
            <link_1.default href="/">Home</link_1.default>
            <link_1.default href="/about">About Us</link_1.default>
            <link_1.default href="/services">Services</link_1.default>
            <link_1.default href="/contact">Contact</link_1.default>
            <link_1.default href="/blog">Blog</link_1.default>
            {session ? (<>
                <span>{((_a = session.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = session.user) === null || _b === void 0 ? void 0 : _b.email)}</span>
                <button onClick={() => (0, react_2.signOut)()} className="bg-red-500 px-3 py-1 rounded">
                  Log Out
                </button>
              </>) : (<>
                <button onClick={() => (0, react_2.signIn)()} className="bg-green-500 px-3 py-1 rounded">
                  Sign In
                </button>
                <link_1.default href="/auth/signup">
                  <button className="bg-blue-500 px-3 py-1 rounded">
                    Sign Up
                  </button>
                </link_1.default>
              </>)}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 My Blog. All rights reserved.</p>
      </footer>
    </div>);
};
exports.default = ClientLayout;
