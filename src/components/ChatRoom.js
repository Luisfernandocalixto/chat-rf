import React, { Component } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // BD

class ChatRoom extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: []
        };
    }

    componentDidMount() {
        const messagesRef = ref(database, 'messages/');  // Use `ref` for referent
        onValue(messagesRef, (snap) => {  // `onValue` for listen change
            const currentMessages = snap.val();
            if (currentMessages !== null) {
                // If message exist , converted in  array
                this.setState({
                    messages: Object.values(currentMessages)
                });
            }
        });
    }

    updateMessage(e) {
        this.setState({ message: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.message === '' || this.state.message.trim() === '') return;

        const newMessage = {
            id: Date.now(),  // Timestamp is ID  unique
            text: this.state.message
        };

        // use `set` for write message
        set(ref(database, 'messages/' + newMessage.id), newMessage);
        this.setState({ message: '' });
    }

    render() {
        const { messages } = this.state;

        return (
            <div>
                <h1>Chat Room</h1>
                <ul>
                    {messages.map((message) => <li key={message.id}>{message.text}</li>)}
                </ul>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={this.updateMessage.bind(this)}
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default ChatRoom;
