import { FC } from "react";
import SearchComponent from "./SearchComponent";
import style from "./style.module.scss";
import { IItem } from "../Content/SearchResults/Table";

export interface IHeaderProps {
  setSearchText: (text: string) => void;
  setTargetItem: (arg: IItem | null) => void;
}
const Header: FC<IHeaderProps> = ({ setSearchText, setTargetItem }) => {
  return (
    <div className={style.header}>
      <SearchComponent
        setSearchText={setSearchText}
        setTargetItem={setTargetItem}
      />
    </div>
  );
};

export default Header;
