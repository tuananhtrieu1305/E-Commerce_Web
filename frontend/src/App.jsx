import { Outlet } from "react-router-dom";
import ChatbotFloat from "./components/chatbot/ChatbotFloat";

const App = () => {
  return (
    <>
      <Outlet />
      <ChatbotFloat />
    </>
  );
};

export default App;
