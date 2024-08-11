import Button from "@mui/material/Button";
import style from "./style.module.scss";
import { FC, FormEvent, useState } from "react";
import { IHeaderProps } from "./Header";

const SearchComponent: FC<IHeaderProps> = ({
  setSearchText,
  setTargetItem,
}) => {
  const [text, setText] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) setSearchText(text);
    setTargetItem(null);
  };
  return (
    <div className={style.searchComponent}>
      <form onSubmit={(e) => submit(e)}>
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
