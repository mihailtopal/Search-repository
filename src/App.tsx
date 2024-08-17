import { useState, useEffect } from "react";
import "./App.css";
import { Content } from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./store/store";
import { IItem } from "./types/types";

const queryClient = new QueryClient();

const App = () => {
  const [searchText, setSearchText] = useState(""); // Состояние для текста поиска
  const [targetItem, setTargetItem] = useState<IItem | null>(null); // Состояние для выбранного элемента
  const token = Cookies.get("github_token"); // Получение токена из cookies
  const setToken = useAuthStore((state) => state.setToken); // Функция переключения состояния наличия токена на true

  // Эффект для установки наличия токена в Redux, если он присутствует в cookies
  useEffect(() => {
    if (token) {
      setToken(); // Устанавливаем наличие токена в Redux
    }
  }, [token]); // Зависимости: dispatch и token

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header setSearchText={setSearchText} setTargetItem={setTargetItem} />
        <Content
          searchText={searchText}
          targetItem={targetItem}
          setTargetItem={setTargetItem}
        />
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
