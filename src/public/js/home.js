const socket = io();
const chatbox = document.querySelector("#chatbox");

let user;

Swal.fire({
    title: 'Enter your name',
    icon: 'question',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'You need to write something!'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then((res)=>{
    user = res.value;
    socket.emit("authenticated", user);
})

socket.on("authenticated", (data) => {
        Swal.fire({
            title: 'Cuidado',
            text: `${data} esta listo entre nosotros`,
            icon: 'success',
            allowOutsideClick: false,
            allowEscapeKey: false
        })
})

chatbox.addEventListener("keyup", (e) => {
    e.key === "Enter" && socket.emit("message", {user: user, message: e.target.value});
})

socket.on("messages", (data) => {
    const chatlog = document.querySelector(".chatlog");
    const li = document.createElement("li");
    let chatMessages = ``;
    data.forEach(message => {
        chatMessages +=`${message.user} dice: ${message.message} <br/>`
    });

    li.innerHTML = chatMessages;

    chatlog.appendChild(li);
})