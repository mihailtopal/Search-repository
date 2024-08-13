import React, { FC } from "react";
import { IItem } from "./Table";

interface IRowProps {
  item: IItem;
  setTargetItem: (arg: IItem | null) => void;
}

const Row: FC<IRowProps> = ({ item, setTargetItem }) => {
  // Используем Intl.DateTimeFormat для форматирования даты
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(item.updatedAt));

  return (
    <tr onClick={() => setTargetItem(item)}>
      <td>{item.name}</td>
      <td>{item.primaryLanguage}</td>
      <td>{item.forkCount}</td>
      <td>{item.stargazerCount}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};
export default Row;
