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
const next_auth_1 = __importDefault(require("next-auth"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const db_1 = __importDefault(require("../../../lib/db"));
const User_1 = __importDefault(require("../../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Ensure environment variables are defined
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (!googleClientId || !googleClientSecret || !nextAuthSecret) {
    throw new Error('Missing required environment variables for Google authentication or NextAuth secret.');
}
exports.default = (0, next_auth_1.default)({
    providers: [
        (0, google_1.default)({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
        (0, credentials_1.default)({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: (credentials) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, db_1.default)();
                const user = yield User_1.default.findOne({ email: credentials === null || credentials === void 0 ? void 0 : credentials.email });
                if (user && bcryptjs_1.default.compareSync(credentials.password, user.password)) {
                    return { id: user._id, name: user.username, email: user.email, role: user.role };
                }
                else {
                    return null;
                }
            }),
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: undefined,
    },
    callbacks: {
        session(_a) {
            return __awaiter(this, arguments, void 0, function* ({ session, token }) {
                if (token) {
                    session.user = {
                        id: token.id,
                        name: token.name,
                        email: token.email,
                        role: token.role,
                    };
                }
                return session;
            });
        },
        jwt(_a) {
            return __awaiter(this, arguments, void 0, function* ({ token, user }) {
                if (user) {
                    token.id = user.id;
                    token.role = user.role;
                }
                return token;
            });
        },
        signIn(_a) {
            return __awaiter(this, arguments, void 0, function* ({ user, account, profile }) {
                yield (0, db_1.default)();
                // Check if the user already exists in the database
                const existingUser = yield User_1.default.findOne({ email: user.email });
                if (!existingUser) {
                    // If the user does not exist, create a new user
                    const newUser = new User_1.default({
                        username: user.name,
                        email: user.email,
                        password: undefined, // No password for Google users
                        role: 'Visitor', // Default role
                    });
                    yield newUser.save();
                }
                return true;
            });
        },
        redirect(_a) {
            return __awaiter(this, arguments, void 0, function* ({ url, baseUrl }) {
                // Redirect user to home page after sign-in
                return baseUrl;
            });
        },
    },
    secret: nextAuthSecret,
});
