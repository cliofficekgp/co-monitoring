import React from 'react';
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";



const socket = io("http://localhost:5000"); // Adjust backend URL as needed

function WhatsAppMonitor() {
    const [qrCode, setQrCode] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logs, setLogs] = useState([]);
    const [config, setConfig] = useState({
        targetGroup: "",
        downloadPath: "",
        mappedDrivePath: "",
        targetDate: "",
        monitorStart: "20:00",
        monitorEnd: "23:00",
        monitorFrequency: 10,
    });

    useEffect(() => {
        socket.on("qr", (data) => {
            setQrCode(data);
            setIsLoggedIn(false);
        });
        socket.on("authenticated", () => setIsLoggedIn(true));
        socket.on("log", (message) => setLogs((prev) => [...prev, message]));
        socket.on("logs", (savedLogs) => setLogs(savedLogs)); // Load logs from DB
    }, []);

    const handleStart = () => {
        socket.emit("start", config);
    };

    const handleStop = () => {
        socket.emit("stop");
    };

    const handleFileSelection = (event, key) => {
        setConfig({ ...config, [key]: event.target.files[0]?.path || "" });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">WhatsApp PDF Monitor</h1>
            <Card>
                <CardContent>
                    <label className="block mb-2">WhatsApp Group</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={config.targetGroup}
                        onChange={(e) => setConfig({ ...config, targetGroup: e.target.value })}
                    />
                    <label className="block mt-4 mb-2">Monitoring Time</label>
                    <input
                        type="time"
                        value={config.monitorStart}
                        onChange={(e) => setConfig({ ...config, monitorStart: e.target.value })}
                    />
                    -
                    <input
                        type="time"
                        value={config.monitorEnd}
                        onChange={(e) => setConfig({ ...config, monitorEnd: e.target.value })}
                    />
                    <label className="block mt-4 mb-2">Download Path</label>
                    <input type="file" webkitdirectory="" directory="" onChange={(e) => handleFileSelection(e, "downloadPath")} className="border p-2 w-full" />
                    <label className="block mt-4 mb-2">Mapped Drive Path</label>
                    <input type="file" webkitdirectory="" directory="" onChange={(e) => handleFileSelection(e, "mappedDrivePath")} className="border p-2 w-full" />
                    <div className="mt-4">
                        <Button onClick={handleStart} className="mr-2">Start</Button>
                        <Button onClick={handleStop} variant="destructive">Stop</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4">
                {isLoggedIn ? (
                    <Button onClick={() => socket.emit("logout")}>Logout</Button>
                ) : qrCode ? (
                    <QRCodeCanvas value={qrCode} size={200} />

                ) : (
                    <p>Waiting for QR Code...</p>
                )}
            </div>

            <div className="mt-4 bg-gray-100 p-4 max-h-60 overflow-auto">
                <h2 className="text-lg font-semibold">Logs</h2>
                {logs.map((log, index) => (
                    <p key={index} className="text-sm">{log}</p>
                ))}
            </div>
        </div>
    );
}

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello, world!
      </h1>
    </div>
  );
}

export default WhatsAppMonitor;
