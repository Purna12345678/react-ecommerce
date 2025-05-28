import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import zod from "zod";
import express from "express";
import bodyParser from "body-parser"; // To parse JSON bodies

// NEW: Import Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

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

// --- Define Global Schemas for McpServer ---
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
const mcpServer = new McpServer({
  // Required properties for McpServer
  name: "MCP Codemod Server",
  version: "1.0.0",
  // Register global schemas that can be referenced by other parts of the protocol
  globalSchemas: {
    projectInfo: projectInfoSchema,
    userInfo: userInfoSchema,
  },
  // Define initial context that might be available globally to all requests
  initialContext: {
    serverVersion: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    defaultProject: {
      projectId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      projectName: "Default Migration Project",
      version: "0.0.1",
    },
  },
});

// --- NEW: Initialize AI Agent (Google Gemini) ---
// Load API Key from environment variable for security
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.warn("\n------------------------------------------------------------");
  console.warn("  WARNING: GOOGLE_API_KEY environment variable not set.    ");
  console.warn("  AI functionalities (codemodName: 'aiCodeTransform')     ");
  console.warn("  will be disabled. Set it like: GOOGLE_API_KEY=YOUR_KEY node mcp-server.js");
  console.warn("------------------------------------------------------------\n");
}

const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;
// You can choose different models, e.g., 'gemini-pro', 'gemini-pro-vision'
const aiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-pro" }) : null;

// --- 4. Define a Codemod Handler Function (Simulated & AI-augmented) ---
// This function now includes logic to optionally use an AI agent.
const applyCodemod = async (
  sourceCode,
  codemodName,
  config = {}
) => {
  console.log(`Applying codemod: ${codemodName} with config:`, JSON.stringify(config) || "{}");
  console.log("Original source code snippet (first 50 chars):", sourceCode.substring(0, 50) + "...");

  let transformedCode = sourceCode;
  const messages = [];
  let success = true;

  try {
    // --- AI-AUGMENTED CODEMOD LOGIC ---
    if (codemodName === "aiCodeTransform") {
      if (!aiModel) {
        messages.push("Error: AI model not initialized. GOOGLE_API_KEY might be missing or invalid.");
        success = false;
        return { transformedCode, messages, success };
      }

      const instruction = config.instruction || "Refactor this JavaScript code for improved readability.";
      messages.push(`AI Agent: Attempting to transform code with instruction: "${instruction}"`);

      try {
        // Construct the prompt for the AI
        const prompt = `Given the following JavaScript code, apply the following change/refactoring:
${instruction}

Here is the code:
\`\`\`javascript
${sourceCode}
\`\`\`

Provide ONLY the transformed code in a JavaScript code block. Do not include any explanations, comments, or extra text outside the code block. If the instruction cannot be fulfilled, return the original code wrapped in a code block.`;

        console.log("Sending prompt to AI (snippet):", prompt.substring(0, 300) + "..."); // Log a snippet of the prompt for debugging

        // Make the API call to the Gemini model
        const result = await aiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text(); // Get the plain text response from the AI

        // Extract the code block from the AI's response
        const codeBlockMatch = text.match(/```javascript\n([\s\S]*?)\n```/);
        if (codeBlockMatch && codeBlockMatch[1]) {
          transformedCode = codeBlockMatch[1];
          messages.push("AI Agent: Successfully transformed code based on instructions.");
        } else {
          // Fallback if the AI doesn't return a perfect code block
          transformedCode = text; // Use the entire response as transformed code
          messages.push("AI Agent: Transformed code received, but no specific JavaScript code block detected. Using raw AI response. Please verify.");
          messages.push("AI Agent Raw Response (first 100 chars for debugging): " + text.substring(0, 100) + "...");
        }

      } catch (aiError) { // Explicitly type aiError for better error handling
        console.error("AI Agent Error during content generation:", aiError);
        messages.push(`AI Agent: Failed to transform code. Error: ${aiError.message || String(aiError)}. Please check API key, quotas, or prompt.`);
        success = false;
      }
    }
    // --- END AI-AUGMENTED CODEMOD LOGIC ---
    // --- Existing Simulated Codemod Logic ---
    else if (codemodName === "renameVariable") {
      const oldName = typeof config?.oldName === "string" ? config.oldName : "oldVar";
      const newName = typeof config?.newName === "string" ? config.newName : "newVar";
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
    // --- End Existing Simulated Codemod Logic ---

  } catch (error) {
    console.error("General Error applying codemod:", error);
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
app.post("/api/codemod", async (req, res) => {
  try {
    // Validate the incoming request body using Zod
    const validatedRequest = codemodRequestSchema.parse(req.body);
    const { sourceCode, codemodName, config } = validatedRequest;

    // Apply the simulated or AI-powered codemod
    const { transformedCode, messages, success } = await applyCodemod(sourceCode, codemodName, config);

    // Prepare the response data according to the codemodResponseSchema
    const responseData = {
      transformedCode,
      messages,
      success,
    };

    // Send the response using Express's res.json method.
    // In a full MCP implementation, mcpServer.sendResponse would handle this,
    // ensuring protocol compliance. For this example, we use res.json.
    // If you used mcpServer.sendResponse, ensure its arguments match.
    // mcpServer.sendResponse(res, responseData, codemodResponseSchema); // Use this if mcpServer.sendResponse is fully implemented as desired
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
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
});

// --- 6. Start the Express Server ---
app.listen(port, () => {
  console.log(`MCP Codemod Server listening at http://localhost:${port}`);
  console.log("To test, send a POST request to http://localhost:3000/api/codemod");
  console.log("\n--- Example AI Code Transformation Request ---");
  console.log(JSON.stringify({
    sourceCode: "function sum(a, b) { return a + b; }",
    codemodName: "aiCodeTransform",
    config: {
      instruction: "Convert this function to an arrow function and add JSDoc comments."
    }
  }, null, 2));
  console.log("\n--- Example Renaming Request ---");
  console.log(JSON.stringify({
    sourceCode: "const oldVar = 10; console.log(oldVar);",
    codemodName: "renameVariable",
    config: { oldName: "oldVar", newName: "newVar" }
  }, null, 2));
});
