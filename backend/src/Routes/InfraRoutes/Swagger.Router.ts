import express from "express";

import swaggerJsDoc from "swagger-jsdoc";

import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Erwan se fait une fortune API",
      version: "1.0.0",
      description: "API to help Erwan make a fortune",
    },
    components: {
      schemas: {
        ServerSuccessfullResponseBody: {
          type: "object",
          properties: {
            transactions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  date: { type: "string" },
                  action: { type: "string" },
                  company: { type: "string" },
                  unitPrice: { type: "number" },
                  numShares: { type: "number" },
                  total: { type: "number" },
                  portfolioAmount: { type: "number" },
                },
              },
            },
            executionTime: {
              type: "object",
              properties: {
                seconds: { type: "number" },
                minutes: { type: "number" },
                milliseconds: { type: "number" },
              },
            },
            profit: { type: "number" },
          },
        },
      },
    },
  },

  apis: ["./src/Routes/*.ts"],
};

const SwaggerRouter = express.Router();

const specs = swaggerJsDoc(options);

SwaggerRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default SwaggerRouter;
