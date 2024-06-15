"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const react_2 = require("next-auth/react");
const Header = () => {
    const { data: session } = (0, react_2.useSession)();
    return (<header className="bg-blue-600 text-white p-4 shadow-md">
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
          {(session === null || session === void 0 ? void 0 : session.user) ? (<>
              <span>{session.user.name || session.user.email}</span>
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
    </header>);
};
exports.default = Header;
