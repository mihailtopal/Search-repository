import { useState } from "react";
import "./App.css";
import { Content } from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { IItem } from "./components/Content/SearchResults/Table";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "./redux/hooks";
import { setToken } from "./redux/auth";

function App() {
  const [searchText, setSearchText] = useState("");
  const [targetItem, setTargetItem] = useState<IItem | null>(null);
  const token = Cookies.get("github_token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(setToken());
  }, [dispatch, token]);
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
}

export default App;
