

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.start()
    .then(() => { console.log("Connection started."); })
    .catch(err => console.log(err));


connection.on("receiveMessage", (username, message) => {
    addMessage(username, message, false);
});


connection.on("ReceiveGroupMessage", (username, message) => {
    addMessage(username, message, false);
});

function addMessage(username, message, isOwnMessage = false) {
    const container = document.getElementById("messagesContainer");

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("d-flex", "mb-2");
    if (isOwnMessage) {
        messageWrapper.classList.add("justify-content-end");
    }
    connection.
    const bubble = document.createElement("div");
    bubble.classList.add("p-2", "rounded");
    if (isOwnMessage) {
        bubble.classList.add("bg-primary", "text-white");
    } else {
        bubble.classList.add("bg-light");
    }

    bubble.innerHTML = `<strong>${username}:</strong> ${message}`;

    messageWrapper.appendChild(bubble);
    container.appendChild(messageWrapper);

    container.scrollTop = container.scrollHeight;

    const input = document.getElementById("messageInput");
    input.value = "";
}

// invoke hub function
function sendMessage() {
    const input = document.getElementById("messageInput");
    const inputUsername = document.getElementById("usernameInput");
    const text = input.value.trim();
    if (!text) return;

    const textUsername = inputUsername.value.trim();
    if (!textUsername) return;

    connection.invoke("SendMessage", textUsername, text)
        .catch(err => console.error(err));
}

function joinGroup() {
    var roomName = document.getElementById("roomnameInput").value;

    connection.invoke("JoinGroup", roomName)
        .then(console.log("User added to chat."))
        .catch(err => console.log(err));
}
function leaveGroup() {
    var roomName = document.getElementById("roomnameInput").value;

    connection.invoke("LeaveGroup", roomName)
        .then(console.log("User leave chat."))
        .catch(err => console.log(err));
}

function sendGroupMessage() {
    var userName = document.getElementById("usernameInput").value;
    var roomName = document.getElementById("roomnameInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessageToGroup", userName, message, roomName)
        .catch(err => console.log(err));
}

