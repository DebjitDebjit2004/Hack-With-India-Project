# Hack-With-India-Project: Frontend

## Overview
This is the frontend of the **Hack-With-India Wildlife Conservation and Exploration Project**. The project aims to raise awareness about India's rich biodiversity and promote wildlife conservation through an interactive platform.

## Features
- **Interactive 3D Models**: Explore animal models in a 3D environment using `@react-three/fiber` and `three.js`.
- **State-wise Wildlife Information**: Detailed information about sanctuaries, flora, and fauna for each Indian state.
- **Dynamic Grid Scene**: A visually appealing grid-based scene to showcase wildlife models.
- **Responsive Design**: Fully responsive UI for seamless experience across devices.

## Tech Stack
- **React**: For building the user interface.
- **@react-three/fiber**: For rendering 3D scenes.
- **@react-three/drei**: For additional 3D utilities like grids and controls.
- **Three.js**: For creating and managing 3D objects.
- **CSS/SCSS**: For styling the application.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hack-with-india-project.git
   cd hack-with-india-project/Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Connecting to Backend
The frontend communicates with the backend to fetch AI-generated responses for user queries. Ensure the backend is running locally or on a server.

### API Endpoint
- **URL**: `http://localhost:3000/chat/chat-animal`
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

### Steps to Connect
1. Update the API URL in the frontend code if the backend is hosted on a different server.
2. Ensure the backend is running and accessible from the frontend.
3. Test the integration by sending a query from the WildTalk page.
