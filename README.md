# Real-Time Chat [IN PROGRESS]

## Overview
This project aims to build a **real-time web application** where users can engage in **instant messaging** and share **media content** such as **images**, **videos**, and **GIFs**. The application will provide a seamless experience for users to:
- Have **text-based conversations**.
- Share **multimedia** like images and videos.
- Create and manage **group chats** with invite-based access.
- Implement **video call** functionality in the second version.

### Two Major Versions:
1. **Version 1**: **Text-based real-time messaging** using **Socket.IO**.[IN PROGRESS]
2. **Version 2**: **Media sharing** (images, videos) and **video calls** using **WebRTC**.

---

## Tech Stack

### Frontend:
- **Next.js**: A React framework for building dynamic web applications with server-side rendering (SSR) and static site generation (SSG).
- **Socket.IO (Version 1)**: Real-time, bidirectional communication between the client and the server for text messaging.
- **WebRTC (Version 2)**: Peer-to-peer communication for media streaming, including video calls and file sharing.

### Backend:
- **Node.js**: JavaScript runtime for building scalable and performant server-side applications.
- **Express.js**: Web framework for Node.js, used to handle RESTful APIs and route management.
- **Socket.IO (Version 1)**: Handling real-time events such as sending and receiving messages.
- **WebRTC (Version 2)**: Real-time peer-to-peer communication for media files (audio/video).

### Database:
- **MongoDB**: A NoSQL database used to store user data, chat logs, and group information.
- **Supabase**: Storage for uploading and retrieving images, videos, and other media files.

---

## Features

### Version 1 (Text-based Communication):
- **Instant Messaging**: Send and receive real-time text messages.
- **Group Chats**: Users can create and manage groups, invite users via email.
- **Notifications**: Real-time alerts when new messages are sent.

### Version 2 (Media Sharing & Video Calls):
- **Image & Video Sharing**: Share images, videos, GIFs, and other media files.
- **Video Calls**: Real-time video call functionality using WebRTC.
- **Peer-to-Peer Communication**: Direct connection between users for media transfer.

---

## Roadmap

1. **Version 1**: Text-based Communication with Socket.IO
    - Set up the **Next.js** frontend with **Socket.IO** integration.
    - Implement real-time messaging functionality.
    - Add **MongoDB** for storing user messages and group data.
    - Allow users to create, join, and manage group chats.
  
2. **Version 2**: Media Sharing & Video Calls with WebRTC
    - Integrate **WebRTC** for peer-to-peer video calls.
    - Implement file upload and media sharing using **Supabase**.
    - Set up video call functionality with direct peer-to-peer communication.
    - Improve user experience with seamless transitions between text and media-based conversations.

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/realtime-chat-app.git
    cd realtime-chat-app
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    npm install
    ```

3. Set up environment variables for **MongoDB** and **Supabase** in a `.env` file:
    ```bash
    MONGODB_URI=your_mongodb_uri
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

---

## Contributing

Feel free to fork this repository, create issues, and submit pull requests. Contributions are welcome!

