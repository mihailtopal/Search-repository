import React, { FC } from "react";
import { IItem } from "./Table";

interface IRowProps {
  item: IItem;
  setTargetItem: (arg: IItem | null) => void;
}
export const Row: FC<IRowProps> = ({ item, setTargetItem }) => {
  const date = new Date(item?.updatedAt); // Получаем день, месяц и год
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`; // Форматируем дату
 
  return (
    <>
      <tr onClick={() => setTargetItem(item)}>
        <td>{item?.name}</td>
        <td>{item?.primaryLanguage}</td>
        <td>{item?.forkCount}</td>
        <td>{item?.stargazerCount}</td>
        <td>{formattedDate}</td>
      </tr>
    
    </>
  );
};
