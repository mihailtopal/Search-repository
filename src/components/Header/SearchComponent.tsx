import Button from "@mui/material/Button";
import style from "./style.module.scss";
import { FC, FormEvent, useState } from "react";
import { IHeaderProps } from "./Header";

// Компонент для поиска
const SearchComponent: FC<IHeaderProps> = ({
  setSearchText, // Функция для установки текста поиска
  setTargetItem, // Функция для сброса целевого элемента поиска
}) => {
  // Локальное состояние для хранения текста ввода
  const [text, setText] = useState("");

  // Обработчик отправки формы
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) setSearchText(text);
    setTargetItem(null);
  };

  return (
    <div className={style.searchComponent}>
      <form onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={style.input}
          placeholder="Поисковый запрос"
        />
        <Button type="submit" variant="contained">
          Искать
        </Button>
      </form>
    </div>
  );
};

export default SearchComponent;
