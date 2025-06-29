# 🎵 JaMoveo – Band Rehearsal Web App

JaMoveo is a real-time rehearsal management web app for musical bands.  
It allows musicians to join a live session from their phones and view lyrics/chords as controlled by an admin user.

---

## 🌐 Live Demo

- **Frontend (Netlify):** [https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)
- **Backend (Render):** [https://jamoveo-server.onrender.com/api/health](https://jamoveo-server.onrender.com/api/health)

---

## ⚙️ Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS (no framework)
- **Backend:** Node.js, Express, Socket.IO
- **Database:** SQLite (via Sequelize ORM)
- **Deployment:** Netlify + Render

---

## 🧪 Features

- 🔍 **Admin panel**: search & select songs
- 🎵 **Live lyrics/chords display** for users
  - Players see **lyrics + chords**
  - Singers see **lyrics only**
- 🔄 **Real-time updates** via Socket.IO
- 🛑 **Quit session** button (admin only) returns everyone to waiting screen
- 🗃️ **Upload songs** via JSON

---

## 📂 Project Structure

```
/
├── client/            # HTML/CSS/JS frontend
├── controllers/       # Express route controllers
├── db/                # SQLite DB and Sequelize config
├── models_objects/    # Sequelize models
├── repositories/      # DB access layer
├── routes/            # Express routes
├── sockets/           # Socket.IO namespace logic
├── app.js             # Express app setup
├── server.js          # Main entrypoint
└── README.md
```

---

## 📦 Install & Run Locally

```bash
git clone https://github.com/yalmoalm/JaMoveo.git
cd JaMoveo
npm install
node server.js
```

