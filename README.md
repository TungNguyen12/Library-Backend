# Backend Assignment - API

This is the README for an Express backend assignment that requires you to implement the REST APIs for a library management system or E-commerce based on the Entity-Relationship Diagram (ERD) assignment. The ERD assignment should outline the data model, including the relationships and attributes of entities within the system. You are tasked with designing and documenting the REST APIs according to the ERD specifications.

## Introduction

This Express backend assignment involves building a RESTful API for a library management system or E-commerce. You are provided with an Entity-Relationship Diagram (ERD) assignment that outlines the data model, including the relationships and attributes of entities such as books, users, authors, and admin roles.

## Entity CRUD Operations

`Before` implementing JWT authentication, `you are required to create the basic CRUD` (Create, Read, Update, Delete) operations for the entities based on the specifications provided in the ERD assignment. This section focuses on designing and implementing the core functionality to manage and interact with the specified entities.

## Authentication

For security, this API should implement user authentication using JSON Web Tokens (JWT). Each user should have a unique username and password OR broker authentication. Certain admin endpoints may require special privileges for access.

## Minimum requirements

Please check the REST API slides where you can find the minimum requirements of the project.

## Response Format

All API responses should be provided in JSON format. A typical response should include a `status`, `data`, and an optional `message` field. The `status` field should indicate the success or failure of the request.

## Error Handling

The API should include comprehensive error handling with clear and informative error messages. Errors should be accompanied by appropriate HTTP status codes.

## Testing

Developers should conduct unit tests and integration tests to ensure the reliability and correctness of the API. Instructions for running the tests should be provided in the project's documentation.

## Deployment

The API should be deployed before the **`DEADLINE`** which is end of Week 47 24th of Nov
