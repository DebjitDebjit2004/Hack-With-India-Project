# Hack-With-India-Project: Backend

## Overview
This is the backend of the **Hack-With-India Wildlife Conservation and Exploration Project**. It provides AI-powered responses to user queries about wildlife using the Gemini API.

## Features
- **AI Chatbot**: Generates responses based on user queries and animal context.
- **Environment Variables**: Securely manages API keys using `.env`.

## API Details
### Endpoint: `/chat/chat-animal`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "animal": "string", // Name of the animal (e.g., "Tiger")
    "message": "string" // User's query or message
  }
  ```
- **Response**:
  - **Status Code**: `201`
  - **Body**:
    ```json
    {
      "message": "string" // AI-generated response
    }
    ```
  - **Error Codes**:
    - `400`: Missing or invalid input.
    - `500`: Server or API key error.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with the following content:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Connecting to Frontend
1. Ensure the backend is running on `http://localhost:3000`.
2. Update the API URL in the frontend code if necessary.
3. Test the integration by sending a query from the frontend WildTalk page.
