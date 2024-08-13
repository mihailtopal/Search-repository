import { useState, useEffect } from "react";
import "./App.css";
import { Content } from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { IItem } from "./components/Content/Table/Table";
import Cookies from "js-cookie";
import { useDispatch } from "./redux/hooks";
import { setToken } from "./redux/auth";

const App = () => {
  const [searchText, setSearchText] = useState(""); // Состояние для текста поиска
  const [targetItem, setTargetItem] = useState<IItem | null>(null); // Состояние для выбранного элемента
  const token = Cookies.get("github_token"); // Получение токена из cookies
  const dispatch = useDispatch();

  // Эффект для установки наличия токена в Redux, если он присутствует в cookies
  useEffect(() => {
    if (token) {
      dispatch(setToken()); // Устанавливаем наличие токена в Redux
    }
  }, [dispatch, token]); // Зависимости: dispatch и token

  return (
    <div className="App">
      <Header setSearchText={setSearchText} setTargetItem={setTargetItem} />
      <Content
        searchText={searchText}
        targetItem={targetItem}
        setTargetItem={setTargetItem}
      />
      <Footer />
    </div>
  );
};

export default App;
