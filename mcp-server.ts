import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import zod from "zod";
import express from "express";
import * as bodyParser from "body-parser";
// To parse JSON bodies

// --- 1. Initialize Express Application ---
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// --- 2. Define Zod Schemas for Codemod Operations ---
// This schema defines the structure of a request to apply a codemod.
// It includes the source code, the name of the codemod to apply,
// and optional configuration for the codemod.
const codemodRequestSchema = zod.object({
  sourceCode: zod.string().min(1, "Source code cannot be empty."),
  codemodName: zod.string().min(1, "Codemod name cannot be empty."),
  config: zod.record(zod.string(), zod.any()).optional(), // Flexible config object
});

// This schema defines the structure of the response after applying a codemod.
// It includes the transformed code and any messages (e.g., warnings, errors, logs).
const codemodResponseSchema = zod.object({
  transformedCode: zod.string(),
  messages: zod.array(zod.string()).default([]),
  success: zod.boolean(),
});

// --- NEW: Define Global Schemas for McpServer ---
// These schemas could represent common data structures used across multiple
// endpoints or for shared context within your protocol.
const projectInfoSchema = zod.object({
  projectId: zod.string().uuid(),
  projectName: zod.string(),
  version: zod.string(),
});

const userInfoSchema = zod.object({
  userId: zod.string().uuid(),
  userName: zod.string(),
  email: zod.string().email(),
});

// --- 3. Initialize McpServer with Global Schemas and Initial Context ---
// The McpServer instance will manage the protocol-specific aspects,
// such as handling context, schema registration, and response formatting.
const mcpServer = new McpServer({
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
const applyCodemod = async (
  sourceCode: string,
  codemodName: string,
  config: Record<string, any> = {}
): Promise<{ transformedCode: string; messages: string[]; success: boolean }> => {
  console.log(`Applying codemod: ${codemodName} with config:`, JSON.stringify(config) || "{}");
  console.log("Original source code snippet:", sourceCode.substring(0, 50) + "...");
  
  let transformedCode = sourceCode;
  const messages: string[] = [];
  let success = true;

  try {
    // --- SIMULATED CODEMOD LOGIC ---
    // Replace this with actual codemod execution logic (e.g., using jscodeshift, AST parsers)
    if (codemodName === "renameVariable") {
      const oldName: string = typeof config?.oldName === "string" ? config.oldName : "oldVar";
      const newName: string = typeof config?.newName === "string" ? config.newName : "newVar";
      transformedCode = sourceCode.replace(new RegExp(`\\b${oldName}\\b`, 'g'), newName);
      messages.push(`Replaced all occurrences of '${oldName}' with '${newName}'.`);
    } else if (codemodName === "addCopyrightHeader") {
      const year = new Date().getFullYear();
      transformedCode = `/*\n * Copyright (c) ${year} Your Company. All rights reserved.\n */\n\n` + sourceCode;
      messages.push("Added copyright header.");
    } else if (codemodName === "removeConsoleLogs") {
        transformedCode = sourceCode.replace(/console\.log\(.*\);?/g, '');
        messages.push("Removed console.log statements.");
    }
    else {
      messages.push(`Warning: Codemod '${codemodName}' not recognized. No transformation applied.`);
      success = false;
    }
    // --- END SIMULATED CODEMOD LOGIC ---

  } catch (error) {
    console.error("Error applying codemod:", error);
    transformedCode = sourceCode; // Revert to original on error
    if (error instanceof Error) {
      messages.push(`Error applying codemod: ${error.message}`);
    } else {
      messages.push(`Error applying codemod: ${String(error)}`);
    }
    success = false;
  }

  return { transformedCode, messages, success };
};

// --- 5. Define Express Route for Codemod Operations ---
// This endpoint will receive requests to perform codemod migrations.
import type { Request, Response } from "express";

app.post("/api/codemod", async (req: Request, res: Response) => {
  try {
    // Validate the incoming request body using Zod
    const validatedRequest = codemodRequestSchema.parse(req.body);
    const { sourceCode, codemodName, config } = validatedRequest;

    // Apply the simulated codemod
    const { transformedCode, messages, success } = await applyCodemod(sourceCode, codemodName, config);

    // Prepare the response data according to the codemodResponseSchema
    const responseData = {
      transformedCode,
      messages,
      success,
    };

    // Send the response using Express's res.json method.
    // Optionally, you can validate the response with codemodResponseSchema before sending.
    res.json(responseData);

  } catch (error) {
    if (error instanceof zod.ZodError) {
      // Handle validation errors from Zod
      console.error("Validation error:", error.errors);
      res.status(400).json({
        error: "Invalid Request Body",
        details: error.errors,
      });
    } else {
      // Handle other unexpected errors
      console.error("Server error:", error);
      const err = error as Error;
      res.status(500).json({
        error: "Internal Server Error",
        details: err.message,
      });
    }
  }
});

// --- 6. Start the Express Server ---
app.listen(port, () => {
  console.log(`MCP Codemod Server listening at http://localhost:${port}`);
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
