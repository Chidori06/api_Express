import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API La bonne salle au bon moment",
            version: "1.0.0",
            description: "API de gestion des salles et des réservations",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },

    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
