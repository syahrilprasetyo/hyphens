import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import iconSend from "../assets/navigation_arrow.svg";
import iconCloseMessage from "../assets/Close_message.svg";

interface Message {
  id: number;
  sander_name: string;
  customer_id: number | null;
  dokter_id: number | null;
  message: string;
  date: string;
  email_customer: string;

}

interface Props {
  dokterId: number;
  emailDokter: string;
  onClose: any;
  selectedDokter: any;
}

const RoomChat: React.FC<Props> = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [emailCustomer, setemailCustomer] = useState(
    localStorage.getItem("email")
  );
  const [customerId, setCustomerId] = useState(
    localStorage.getItem("customerId")
  );
  const [emailDokter, setEmailDokter] = useState(props.emailDokter);
  const [dokterId, setDokterId] = useState(props.dokterId);
  const [roomChatId, setRoomChatId] = useState();
  const socket = socketIOClient("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authenticateSocket();

    return () => {
      socket.off("authenticated");
      socket.off("unauthenticated");
      socket.off("private_message");
      socket.off("recipient_not_found");
    };
  }, []);

  // useEffect(() => {
  //   setRoomChatId(props.chatId);
  // }, [props.chatId]);

  const authenticateSocket = () => {
    const email = localStorage.getItem("email");
    socket.emit("authenticate", email);
    socket.on("authenticated", (user) => {
      console.log("Authenticated as", user);
      setAuthenticated(true);
    });

    socket.on("unauthenticated", (data) => {
      console.error("Authentication failed");
    });
  };

  useEffect(() => {
    socket.on("private_message", ({ sender, message }) => {
      console.log("Received private message from", sender, ":", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("recipient_not_found", () => {
      console.error("Recipient not found");
    });

    socket.on("private_chat_request", ({ room, recipientId, message }) => {
      const now = new Date();
      const hour = now.getUTCHours().toString().padStart(2, "0");
      const minute = now.getUTCMinutes().toString().padStart(2, "0");
      const hourMinute = `${hour}:${minute}`;

      const newMessageObj: Message = {
        id: messages.length + 1,
        sander_name: "dokter",
        message: message,
        customer_id: null,
        dokter_id: dokterId,
        date: hourMinute,
        email_customer: "",
      };
      console.log("Private chat request received:", room, message);
      socket.emit("join_room", room);
      console.log(`Joined room: ${room}`);
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    });

    return () => {
      socket.off("private_message");
      socket.off("recipient_not_found");
      socket.off("private_chat_request");
      socket.off("authenticated"); // Clean up event listeners
      socket.off("unauthenticated"); // Clean up event listeners
    };
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const now = new Date();
      const hour = now.getUTCHours().toString().padStart(2, "0");
      const minute = now.getUTCMinutes().toString().padStart(2, "0");
      const hourMinute = `${hour}:${minute}`;

      const newMessageObj: Message = {
        id: 1,
        sander_name: "Me",
        message: newMessage.trim(),
        customer_id: parseInt(customerId ?? ""),
        dokter_id: null,
        date: hourMinute,
        email_customer: "",
      };

      const recipientId = emailDokter; // Replace 'userB' with the recipient's ID
      const message = newMessage.trim();
      socket.emit("private_chat", { recipientId, message });
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");
    }

  



    axios.post("http://localhost:8000/Message/Create", {
      Auth: "",
      sender: "customer",
      customerId: parseInt(customerId ?? ""),
      message: newMessage.trim(),
      room_chat_id: roomChatId,
    });
  };

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .post("http://localhost:8000/Message/ShowMessages", {
        // Auth: isLoggedIn,

        Auth: "",
        room_chat_id: roomChatId,
        //   "dokterId": 2
      })
      .then((response) => {
        setMessages(response.data.data.messages ?? []);
        // setDokterId(response.data.data.identifier.email_dokter);
        // set(response.data.data.identifier.email_customer);
        //  setDokterId(response.data.data.identifier.dokter_id);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, display error message, or provide user feedback
      });
  }, [roomChatId]);

  // Inside your component
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever messages change

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Assuming 'messages' is the array of messages

  useEffect(() => {
    setEmailDokter(props.emailDokter);
  }, [props.emailDokter]);

const [isOpenRoomChat, setIsOpenRoomChat] = useState(false)
  const handleClickStartChat = (id: number) => { 
    props.selectedDokter(id)
    setIsOpenRoomChat(true);
     setDokterId(id);
     const customerId = localStorage.getItem("customerId");
     axios
       .post("http://localhost:8000/Message/Create", {
         Auth: "",
         customerId: parseInt(customerId ?? ""),
         dokterId: id,
       })
       .then((response) => {
         setRoomChatId(response.data.data.room_chat_id);
         console.log(response.data.data.room_chat_id);
         console.log(response.data.data.message);
       })
       .catch((error) => {
         console.error("Error:", error);
         // Handle error, display error message, or provide user feedback
       });
  }


  const handleClickCloseRoomChat = () => { 
    setIsOpenRoomChat(false);
  };


  return (
    <div className="container ">
      <div className="flex flex-col w-full h-full  overflow-hidden justify-around ">
        {/* Message List */}
        <div className="  bg-[#F6F6F6] gap-6 p-6 overflow-y-auto  overflow-hidden h-full flex flex-col">
          {/* <h2 className="text-xl font-bold mb-4">Message List</h2> */}

          {!isOpenRoomChat && (
            <div className="justify-center content-center flex flex-col h-full w-full items-center">
              <button
                className="w-[192px] h-[44px] rounded-3xl bg-[#1271FF] text-white"
                onClick={() => handleClickStartChat(props.dokterId)}>
                start chat
              </button>
            </div>
          )}

          {isOpenRoomChat && messages
            ? messages.map((message) => {
                console.log(message);
                if (
                  message.email_customer !== null &&
                  message.customer_id !== null
                ) {
                  return (
                    <div className="flex flex-row justify-end gap-1">
                      <div className="flex flex-col justify-end text-xs text-[#A2A2A2] font-normal">
                        {message.date}
                      </div>
                      <div className="bg-[#FFFFFF] rounded-xl p-3 border">
                        <p className="text-[14px] font-normal text-right">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex flex-row justify-start gap-1">
                      <div className=" rounded-xl p-3 border border-[#D9D9D9]">
                        <p className="text-[14px] font-normal text-right">
                          {message.message}
                        </p>
                      </div>
                      <div className="flex flex-col justify-end text-xs text-[#A2A2A2] font-normal">
                        {message.date}
                      </div>
                    </div>
                  );
                }
              })
            : ""}
          {/* Use this empty div as a marker for scrolling to bottom */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Send Message Form */}

        {isOpenRoomChat && (
          <div className="border border-gray-300  p-6 bottom-0 flex flex-row gap-4 ">
            <form
              onSubmit={handleMessageSubmit}
              className="flex flex-row gap-4   h-[48px] w-full">
              <textarea
                className="w-full border border-gray-300 rounded-md resize-none"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-whiteflex flex-col justify-center content-center items-center h-12 w-12 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                <img src={iconSend} alt="" className="h-6 w-6" />
              </button>
            </form>

            <button
              onClick={handleClickCloseRoomChat}
              className="bg-[#E0EDFF] text-whiteflex flex-col justify-center content-center items-center h-12 w-12 rounded-md hover:bg-blue-300 transition duration-300 ease-in-out">
              <img src={iconCloseMessage} alt="" className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomChat;
