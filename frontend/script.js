// 1. Landing page se chat screen par jaane ka logic
function startChat() {
    const landing = document.getElementById("landingScreen");
    const chat = document.getElementById("chatScreen");

    // Landing page ko fade-out karo
    landing.style.opacity = "0";
    
    // Animation complete hone ka wait karo
    setTimeout(() => {
        landing.style.display = "none";
        chat.classList.remove("hidden");
    }, 800);
}

// 2. Chat mein message bhejne ka professional logic
function sendMessage() {


    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");


    if (input.value.trim() !== "") {

      
}
async function sendMessage() {
    const userMessage = document.getElementById('userInput').value; // Input field se text lo

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }), // Yahi data backend ke req.body mein jayega
        });

        const data = await response.json();
        
        // AI ka jawab screen pe dikhao
        document.getElementById('chatOutput').innerText = data.reply;
        
    } catch (error) {
        console.error("Error connecting to server:", error);
        alert("Server se connect nahi ho paya!");
    }
}

        // A. User message add karna (Professional tarika)
        let userDiv = document.createElement("div");
        userDiv.className = "message user";
        userDiv.innerHTML = `<div class="bubble">${input.value}</div>`;
        chatBox.appendChild(userDiv);
        
        // Input saaf karo aur scroll niche karo
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // B. Jarvis (AI) ka reply simulation
        setTimeout(() => {
            let aiDiv = document.createElement("div");
            aiDiv.className = "message ai";
            
            // Yahan 'ai-avatar.jpg' ki jagah apni image ka naam likhna
            aiDiv.innerHTML = `
                <img src="Ai.jpeg" class="ai-profile-img">
                <div class="bubble">I am Jarvis. How can I help you?</div>
            `;
            
            chatBox.appendChild(aiDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 600);
    }


// 3. Enter key press karne par message bhejne ka event
document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});