import { Outlet } from "react-router-dom";
import ChatbotFloat from "./components/chatbot/ChatbotFloat";

const App = () => {
  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <Outlet />
      <ChatbotFloat />
    </>
  );
};

export default App;
