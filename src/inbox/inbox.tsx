import React, { useState, useEffect } from "react";
import RoomChat from "../message/messagePage";
import axios from "axios";
import Nav from "../home/nav";

// Assuming you have a ChatRoom component

// Define an interface representing the shape of a chat object
interface Chat {
  room_chat_id: number;
  dokter_id: number;
  customer_id: number;
  room_chat_createdAt: string;
  room_chat_updatedAt: string;
  customer_name: string;
  message: string;
  message_createdAt: string;
  message_updatedAt: string;
  dokter_name: string;
  dokter_email: string;
}

interface DokterList {
  id: number;
  name: string;
  username: string;
  email: string;
}

function Messages() {
  const [chats, setChats] = useState<Chat[]>([]); // Provide the Chat[] type
  const [dokterList, setDokterList] = useState<DokterList[]>([]); // Provide the Chat[] type
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [dokterId, setDokterId] = useState(0);
  const [emailDokter, setEmailDokter] = useState("");

  useEffect(() => {
    // Fetch data from the API endpoint
    const customerId = localStorage.getItem("customerId");
    axios
      .post("http://localhost:8000/Message/ChatList", {
        // Auth: isLoggedIn,

        Auth: "",
        customerId: parseInt(customerId ?? ""),
      })
      .then((response) => {
        setChats(response.data.data.chatList);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, display error message, or provide user feedback
      });
  }, []); // Run this effect only once, on component mount

  useEffect(() => {
    // Fetch data from the API endpoint
    const customerId = localStorage.getItem("customerId");
    axios
      .post("http://localhost:8000/Message/DokterList", {
        Auth: "",
        customerId: parseInt(customerId ?? ""),
      })
      .then((response) => {
        setDokterList(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, display error message, or provide user feedback
      });
  }, []); // Run this effect only once, on component mount

  const handleChooseDokter = (id: number, email: string) => {
    setDokterId(id);
    setEmailDokter(email);
  };

  const handleCloseChat = () => {
    setSelectedChatId(null);
  };

  const [selectedDokterId, setSelectedDokterId] = useState(0);
  const selectedDokter = (id: number) => {
    setSelectedDokterId(id);
  };

  return (
    <>
      <Nav />
      <div className="h-24 "></div>
      <div className="flex flex-col px-[120px] py-5  justify-center content-center gap-3 ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Chat
        </div>
        <div className="container h-[556px] border w-full  rounded-xl">
          <div className="flex h-full  ">
            {/* Chat List */}
            <div className="h-full">
              <div className="flex flex-col w-80 h-full bg-white border  overflow-hidden rounded-tl-[12px] rounded-bl-[12px]">
                <hr />
                <div className="bg-gray-100 px-4 py-2">
                  <h2 className="text-lg font-bold">Dokter Are Available</h2>
                </div>
                <div className="divide-y divide-gray-300 overflow-y-auto">
                  {dokterList.length > 0 ? (
                    dokterList.map((data) => (
                      <div
                        key={data.id}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                        onClick={
                          selectedDokterId === 0
                            ? () => handleChooseDokter(data.id, data.email)
                            : selectedDokterId === data.id
                            ? () => handleChooseDokter(data.id, data.email)
                            : undefined
                        }>
                        <div className="mb-2">
                          <h2
                            className={`text-lg font-bold ${
                              selectedDokterId === 0
                                ? ""
                                : selectedDokterId === data.id
                                ? ""
                                : "text-gray-300"
                            }`}>
                            {data.name}
                          </h2>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">No dokter are available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full h-full">
              <RoomChat
                onClose={handleCloseChat}
                dokterId={dokterId}
                emailDokter={emailDokter}
                selectedDokter={selectedDokter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
