"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
require("../styles/globals.css");
function RootLayout({ children }) {
    return (<html lang="en">
      <body>
        <react_1.SessionProvider>{children}</react_1.SessionProvider>
      </body>
    </html>);
}
exports.default = RootLayout;
