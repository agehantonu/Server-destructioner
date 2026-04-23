/**
 * Discord Webhook Looper Logic
 */

// --- ⚙️ 設定 (GitHubに上げる際はここを隠すか、環境変数から読み込む) ---
const VALID_KEY = "AGEHANTO-6pQ2N9mXvB5rL1zW8kYjH4gT7cF3dS0nPqA9eM1iO5uR2tV8yZ4xK0wL3nJ7mQ9bP1vC5xR8zT2yW4vN0mK1pQ9rS5tB3xZ7hV2nL0mJ8kP4qW1vR9zT7yX3nL5pQ0rM1vB8zW4tN7mK2pQ9xS5tB3xZ0hV2nL8mJ1kP4qW7vR9zT3yX5nL0pQ1rM8vB4zW7tN2mK9pQ5xS0tB3xZ8hV1nL2mJ7kP4qW9vR3zT5yX0nL8pQ1rM4vB7zW2tN9mK5pQ0xS3tB8xZ1hV2nL7mJ4kP9qW3vR5zT0yX8nL1pQ4rM7vB2zW9tN5mK0pQ3xS8tB1xZ2hV7nL4mJ9kP3qW5vR0zT8yX1nL4pQ7rM2vB9zW5tN0mK3pQ8xS1tB2xZ7hV4nL9mJ3kP5qW0vR8zT1yX4nL7pQ2rM9vB5zW0tN3mK8pQ1xS2tB7xZ4hV9nL3mJ5kP0qW8vR1zT4yX7nL2pQ9rM5vB0zW3tN8mK1pQ2xS7tB4xZ9hV3nL5mJ0kP8qW1vR4zT7yX2nL9pQ5rM0vB3zW8tN1mK2pQ7xS4tB9xZ3hV5nL0mJ8kP1qW4vR7zT2yX9nL5pQ0rM3vB8zW1tN2mK-discordspamer"; 

const CONFIG = {
    username: "nuker",
    avatar_url: "https://cdn.discordapp.com/attachments/1495747908639653981/1496834696972341308/image.png?",
    content: "@everyone @here ",
    embed_title: "[このサーバーは破壊](https://discord.gg/4rRzQZjJtP)",
    embed_description: "# [n](https://cdn.discordapp.com/attachments/1495649200057090119/1496838665744154745/17295471964.jpg? ) [u](https://cdn.discordapp.com/attachments/1495649200057090119/1496839175897354383/17295471975.jpg?)ke",
    embed_color: 3447003
};



const unlock = () => {
    const keyInput = document.getElementById('accessKey').value;
    if (keyInput === VALID_KEY) {
        document.getElementById('authScreen').classList.add('hidden');
        document.body.classList.replace('bg-gray-800', 'bg-black');
        document.getElementById('toolScreen').classList.remove('hidden');
    } else {
        alert("Invalid Access Key");
    }
};

// --- 📡 送信処理 ---
let sendCount = 0;
const fireWebhook = async () => {
    const url = document.getElementById('webhookUrl').value;
    if (!url) return;

    const payload = {
        username: CONFIG.username,
        avatar_url: CONFIG.avatar_url,
        content: CONFIG.content,
        embeds: [{
            title: CONFIG.embed_title,
            description: CONFIG.embed_description,
            color: CONFIG.embed_color,
            timestamp: new Date().toISOString(),
            footer: { text: "Infinite Loop Mode" }
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            sendCount++;
            document.getElementById('counter').innerText = sendCount;
        }
    } catch (error) {
        console.error("Transmission Error:", error);
    }
};

// --- 🔄 ループ開始 ---
const startLoop = () => {
    const url = document.getElementById('webhookUrl').value;
    const interval = document.getElementById('interval').value;

    if (!url) {
        alert("Please enter a valid Webhook URL");
        return;
    }

    // UI更新
    document.getElementById('startBtn').remove();
    document.getElementById('statusArea').classList.remove('hidden');
    document.getElementById('webhookUrl').disabled = true;
    document.getElementById('interval').disabled = true;

    // 実行
    fireWebhook();
    setInterval(fireWebhook, interval * 1000);
};

// --- 🖱️ イベントリスナー ---
document.getElementById('unlockBtn').addEventListener('click', unlock);
document.getElementById('startBtn').addEventListener('click', startLoop);