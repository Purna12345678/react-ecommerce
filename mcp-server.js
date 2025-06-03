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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var zod_1 = require("zod");
var express_1 = require("express"); // Using 'express' directly as it's a common practice
var body_parser_1 = require("body-parser"); // To parse JSON bodies
// --- 1. Initialize Express Application ---
var app = (0, express_1.default)();
var port = 3000;
// Use body-parser middleware to parse JSON request bodies
app.use(body_parser_1.default.json());
// --- 2. Define Zod Schemas for Codemod Operations ---
// This schema defines the structure of a request to apply a codemod.
// It includes the source code, the name of the codemod to apply,
// and optional configuration for the codemod.
var codemodRequestSchema = zod_1.default.object({
    sourceCode: zod_1.default.string().min(1, "Source code cannot be empty."),
    codemodName: zod_1.default.string().min(1, "Codemod name cannot be empty."),
    config: zod_1.default.record(zod_1.default.string(), zod_1.default.any()).optional(), // Flexible config object
});
// This schema defines the structure of the response after applying a codemod.
// It includes the transformed code and any messages (e.g., warnings, errors, logs).
var codemodResponseSchema = zod_1.default.object({
    transformedCode: zod_1.default.string(),
    messages: zod_1.default.array(zod_1.default.string()).default([]),
    success: zod_1.default.boolean(),
});
// --- NEW: Define Global Schemas for McpServer ---
// These schemas could represent common data structures used across multiple
// endpoints or for shared context within your protocol.
var projectInfoSchema = zod_1.default.object({
    projectId: zod_1.default.string().uuid(),
    projectName: zod_1.default.string(),
    version: zod_1.default.string(),
});
var userInfoSchema = zod_1.default.object({
    userId: zod_1.default.string().uuid(),
    userName: zod_1.default.string(),
    email: zod_1.default.string().email(),
});
// --- 3. Initialize McpServer with Global Schemas and Initial Context ---
// The McpServer instance will manage the protocol-specific aspects,
// such as handling context, schema registration, and response formatting.
var mcpServer = new mcp_js_1.McpServer({
    // Required properties for McpServer
    name: "MCP Codemod Server",
    version: "1.0.0",
    // Register global schemas that can be referenced by other parts of the protocol
    // or for validating shared data.
    globalSchemas: {
        projectInfo: projectInfoSchema,
        userInfo: userInfoSchema,
    },
    // Define initial context that might be available globally to all requests
    // or used for internal state management within the protocol.
    initialContext: {
        serverVersion: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        // Example of a default project info, which could be overridden per request
        defaultProject: {
            projectId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            projectName: "Default Migration Project",
            version: "0.0.1",
        },
    },
});
// --- 4. Define a Codemod Handler Function (Simulated) ---
// In a real application, this function would dynamically load and apply
// the specified codemod to the source code.
var applyCodemod = function (sourceCode, codemodName, config) { return __awaiter(void 0, void 0, void 0, function () {
    var transformedCode, messages, success, oldName, newName, year;
    return __generator(this, function (_a) {
        console.log("Applying codemod: ".concat(codemodName, " with config:"), config);
        console.log("Original source code snippet:", sourceCode.substring(0, 50) + "...");
        transformedCode = sourceCode;
        messages = [];
        success = true;
        try {
            // --- SIMULATED CODEMOD LOGIC ---
            // Replace this with actual codemod execution logic (e.g., using jscodeshift, AST parsers)
            if (codemodName === "renameVariable") {
                oldName = (config === null || config === void 0 ? void 0 : config.oldName) || "oldVar";
                newName = (config === null || config === void 0 ? void 0 : config.newName) || "newVar";
                transformedCode = sourceCode.replace(new RegExp("\\b".concat(oldName, "\\b"), 'g'), newName);
                messages.push("Replaced all occurrences of '".concat(oldName, "' with '").concat(newName, "'."));
            }
            else if (codemodName === "addCopyrightHeader") {
                year = new Date().getFullYear();
                transformedCode = "/*\n * Copyright (c) ".concat(year, " Your Company. All rights reserved.\n */\n\n") + sourceCode;
                messages.push("Added copyright header.");
            }
            else if (codemodName === "removeConsoleLogs") {
                transformedCode = sourceCode.replace(/console\.log\(.*\);?/g, '');
                messages.push("Removed console.log statements.");
            }
            else {
                messages.push("Warning: Codemod '".concat(codemodName, "' not recognized. No transformation applied."));
                success = false;
            }
            // --- END SIMULATED CODEMOD LOGIC ---
        }
        catch (error) {
            console.error("Error applying codemod:", error);
            transformedCode = sourceCode; // Revert to original on error
            messages.push("Error applying codemod: ".concat(error.message));
            success = false;
        }
        return [2 /*return*/, { transformedCode: transformedCode, messages: messages, success: success }];
    });
}); };
// --- 5. Define Express Route for Codemod Operations ---
// This endpoint will receive requests to perform codemod migrations.
app.post("/api/codemod", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validatedRequest, sourceCode, codemodName, config, _a, transformedCode, messages, success, responseData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                validatedRequest = codemodRequestSchema.parse(req.body);
                sourceCode = validatedRequest.sourceCode, codemodName = validatedRequest.codemodName, config = validatedRequest.config;
                return [4 /*yield*/, applyCodemod(sourceCode, codemodName, config)];
            case 1:
                _a = _b.sent(), transformedCode = _a.transformedCode, messages = _a.messages, success = _a.success;
                responseData = {
                    transformedCode: transformedCode,
                    messages: messages,
                    success: success,
                };
                // Send the response using Express's res.json method.
                // Optionally, you can validate the response with codemodResponseSchema before sending.
                res.json(responseData);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                if (error_1 instanceof zod_1.default.ZodError) {
                    // Handle validation errors from Zod
                    console.error("Validation error:", error_1.errors);
                    res.status(400).json({
                        error: "Invalid Request Body",
                        details: error_1.errors,
                    });
                }
                else {
                    // Handle other unexpected errors
                    console.error("Server error:", error_1);
                    res.status(500).json({
                        error: "Internal Server Error",
                        details: error_1.message,
                    });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// --- 6. Start the Express Server ---
app.listen(port, function () {
    console.log("MCP Codemod Server listening at http://localhost:".concat(port));
    console.log("To test, send a POST request to http://localhost:3000/api/codemod");
    console.log("Example request body:");
    console.log(JSON.stringify({
        sourceCode: "const oldVar = 10; console.log(oldVar);",
        codemodName: "renameVariable",
        config: { oldName: "oldVar", newName: "newVar" }
    }, null, 2));
    console.log("\nAnother example:");
    console.log(JSON.stringify({
        sourceCode: "function greet() { console.log('Hello'); }",
        codemodName: "removeConsoleLogs"
    }, null, 2));
});
