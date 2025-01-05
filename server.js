const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { createCanvas } = require('canvas');

const app = express();
const PORT = 3000;

let connectedIPs = {};

// Middleware untuk melacak jumlah koneksi berdasarkan IP
app.use((req, res, next) => {
    const ip = req.ip;
    if (!connectedIPs[ip]) {
        connectedIPs[ip] = 1;
    } else {
        connectedIPs[ip]++;
    }

    res.on('finish', () => {
        connectedIPs[ip]--;
        if (connectedIPs[ip] === 0) {
            delete connectedIPs[ip];
        }
    });

    next();
});

// Menyajikan file statis dari direktori "public"
app.use(express.static(path.join(__dirname, 'public')));

// Menyajikan file video dari direktori yang ditentukan
app.use('/video', express.static('D:/fdm/Opruto.com_Nika 226-250 720p/1'));

// Menyajikan index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Endpoint untuk mendapatkan daftar video yang diurutkan
app.get('/videos', (req, res) => {
    const videoDir = 'D:/fdm/Opruto.com_Nika 226-250 720p/1';
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            console.error('Tidak dapat memindai direktori:', err);
            return res.status(500).send('Tidak dapat memindai direktori');
        }
        const videoFiles = files.filter(file => file.endsWith('.mp4')).sort();
        res.json(videoFiles);
    });
});

// Endpoint untuk mendapatkan grafik penggunaan RAM
app.get('/penggunaan-ram', (req, res) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    // Menggambar latar belakang
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 400, 200);

    // Menggambar bar memori terpakai
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 50, (usedMem / totalMem) * 300, 50);

    // Menggambar bar memori bebas
    ctx.fillStyle = '#0f0';
    ctx.fillRect(50 + (usedMem / totalMem) * 300, 50, (freeMem / totalMem) * 300, 50);

    // Menggambar teks
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Penggunaan RAM', 150, 30);
    ctx.fillText(`Terpakai: ${(usedMem / (1024 * 1024)).toFixed(2)} MB`, 50, 120);
    ctx.fillText(`Bebas: ${(freeMem / (1024 * 1024)).toFixed(2)} MB`, 50, 150);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.end(canvas.toBuffer());
});

// Memulai server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan di http://192.168.0.114:${PORT}`);
});