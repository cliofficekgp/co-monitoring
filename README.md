# WhatsApp PDF Monitor

This project automates the monitoring of a WhatsApp group for PDF file attachments, downloads them based on date-based filenames, and organizes them into mapped Google Drive folders. The project consists of a **React-based Web UI** and a **Node.js backend**.

## Features

- Web UI to configure and control the automation.
- Real-time QR Code login for WhatsApp Web.
- Monitors WhatsApp group messages for PDFs matching tomorrow's date.
- Downloads and organizes PDFs into mapped folders.
- Deletes old files before placing new ones.
- Runs on a scheduled time (20:00 - 23:00) with a configurable frequency.
- Supports Docker for easy deployment.

## Folder Structure

```
whatsapp-monitor/
│── backend/                # Backend server (Node.js + Express)
│   ├── src/
│   │   ├── config/         # Configuration files (env, DB)
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── app.js          # Express app setup
│   │   ├── server.js       # Server entry point
│   ├── .env                # Environment variables
│   ├── Dockerfile          # Backend Dockerfile
│   ├── package.json        # Dependencies
│── frontend/               # Frontend (React + TailwindCSS)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # App pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.js          # Main React app
│   │   ├── index.js        # Entry point
│   ├── Dockerfile          # Frontend Dockerfile
│   ├── package.json        # Dependencies
│── docker-compose.yml      # Docker Compose setup
```

## Installation

### 1. Backend Setup

```sh
cd backend
npm install
node src/server.js
```

### 2. Frontend Setup

```sh
cd frontend
npm install
npm start
```

### 3. Running with Docker

```sh
docker-compose up --build
```

## Environment Variables (.env)

```
PORT=5000
WHATSAPP_GROUP=YourGroupName
MONITOR_START=20:00
MONITOR_END=23:00
MONITOR_FREQUENCY=10
DOWNLOAD_PATH=/your/download/path
MAPPED_DRIVE_PATH=/your/drive/path
```

## Usage

1. **Login to WhatsApp** using the Web UI QR Code.
2. **Configure Monitoring Parameters** (Group Name, Paths, Time).
3. Click **Start** to begin monitoring.
4. Check the logs for real-time updates.
5. Click **Stop** to stop monitoring.

## License

This project is open-source and available under the MIT License.
