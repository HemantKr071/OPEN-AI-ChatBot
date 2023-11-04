const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";
//const API_KEY = "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";
//const API_KEY = "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";

const createChatLi = (message, className) => {
    // Create chat li element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<P>${message}</P>` : `<span class="material-symbols-outlined">smart_toy</span><P>${message}</P>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user","content": userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
       // console.log(data);
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        //console.log(error);
        messageElement.textContent = "Oops ! Something went wrong...";
    })
}

const handleChat = () => {
    userMessage= chatInput.value.trim();
    console.log(userMessage);
    if(!userMessage) return;
    //Append the user message to the chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(() => {
        // Displaying a thinking message before fetching the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    },500);
}

sendChatBtn.addEventListener("click", handleChat);
