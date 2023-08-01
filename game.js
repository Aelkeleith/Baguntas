const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const objek = ["👊", "🤚", "✌️"];
const jumlahAwal = 15;
const width = 60;
const height = 60;
const fps = 5; // Ubah kecepatan animasi di sini

let grid = [];

function setup() {
    for (let i = 0; i < objek.length; i++) {
        for (let j = 0; j < jumlahAwal; j++) {
            grid.push(objek[i]);
        }
    }
    shuffle(grid);
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x = 20;
    let y = 20;
    for (let i = 0; i < grid.length; i++) {
        ctx.fillText(grid[i], x, y);
        x += width;
        if (x >= canvas.width - width) {
            x = 20;
            y += height;
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkCollision() {
    let changed = false;
    for (let i = 0; i < grid.length - 1; i++) {
        if (grid[i] !== grid[i + 1]) {
            if ((grid[i] === "👊" && grid[i + 1] === "✌️") ||
                (grid[i] === "✌️" && grid[i + 1] === "🤚") ||
                (grid[i] === "🤚" && grid[i + 1] === "👊")) {
                grid[i + 1] = grid[i];
                changed = true;
            }
        }
    }
    if (changed) {
        checkCollision();
    }
}

function playGame() {
    checkCollision();
    drawGrid();
    if (grid.filter((obj) => obj === "👊").length > 0 &&
        grid.filter((obj) => obj === "🤚").length > 0 &&
        grid.filter((obj) => obj === "✌️").length > 0) {
        requestAnimationFrame(playGame);
    } else {
        const result = grid.filter(Boolean)[0];
        alert("Permainan selesai! Jenis objek yang tersisa: " + result);
    }
}

setup();
setInterval(playGame, 1000 / fps);
