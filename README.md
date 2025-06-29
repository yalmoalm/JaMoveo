# 🎶 JaMoveo – Live Rehearsal System

**JaMoveo** is a rehearsal collaboration platform built for real-time display of song lyrics and chords between an admin and players via WebSockets.

---

## 🌐 Live Deployment

- 🎛️ Admin Panel: (https://bucolic-melba-10ceb5.netlify.app/admin.html)  
- 🎼 Player View: (https://bucolic-melba-10ceb5.netlify.app/)

> The backend is hosted on Render and serves Socket.IO communication and song content APIs.

---

## 🧪 Try It Out

To test the system:

1. Open the **Admin Panel** link.
2. Use the search box to search for:
   - `hey_jude`
   - `veech_shelo`
3. Press **Select** to broadcast the song to all connected players.
4. Open the **Player View** link in another tab to see the live display update.

---

## ⚙️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JS
- **Backend:** Node.js, Express, Socket.IO
- **Database:** SQLite via Sequelize ORM
- **Deployment:** Netlify (frontend), Render (backend)

---

## 📁 Project Structure

```
📦 root/
├── public/
│   ├── index.html           # Player view
│   ├── admin.html           # Admin control panel
│   ├── socket.html          # Socket debug UI
│   ├── css/
│   │   └── templet.css      # Styling
│   └── images/
│       └── moveo-logo.png   # Logo assets
│
├── db/
│   ├── jamoveo.db           # SQLite database file
│   ├── sequelize.js         # Sequelize config
│   └── initModels.js        # Initializes model associations
│
├── models/
│   ├── User.js
│   ├── Song.js
│   ├── SongLine.js
│   ├── Session.js
│   └── Role.js
│
├── repositories/
│   ├── authRepository.js
│   ├── roleRepository.js
│   ├── sessionRepository.js
│   ├── songRepository.js
│   └── userRepository.js
│
├── controllers/
│   ├── authController.js
│   ├── sessionController.js
│   ├── songController.js
│   └── userController.js
│
├── middleware/
│   └── requireRole.js       # Role-based access control
│
├── socketServer.js          # Handles all Socket.IO logic
├── app.js                   # Express app instance
├── server.js                # Starts HTTP server
├── package.json             # Node.js dependencies and scripts
└── README.md                # Project overview
```

---

## 🔌 Socket Namespace

All socket communication is done via the namespace:  
```
https://jamoveo-server-rs50.onrender.com/sessions
```

---

© 2025 – JaMoveo · Moveo Coding Task – Web Development
