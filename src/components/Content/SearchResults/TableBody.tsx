import { FC, useEffect, useState } from "react";
import style from "../style.module.scss";
import { Row } from "./Row";
import Skeleton from "@mui/material/Skeleton";
import { IItem } from "./Table";

interface ITableBodyProps {
  isFetching: boolean;
  filteredItems: IItem[] | undefined;
  error: any;
  setTargetItem: (arg: IItem | null) => void;
  handleClickOpen: () => void;
}

const TableBody: FC<ITableBodyProps> = ({
  isFetching,
  filteredItems,
  error,
  setTargetItem,
  handleClickOpen,
}) => {
  const [tableContent, setTableContent] = useState(<></>);

  // задаем какой контент будет внутри таблица в зависимости от ответа сервера
  // это либо pending тогад  загрузка, либо пустой массив(не найдено),
  //либо ошибка, либо массив данных
  useEffect(() => {
    if (isFetching)
      setTableContent(
        <tbody className={style.loading}>
          <Skeleton component="tr" variant="rectangular" animation="wave" />
          <tr>Загрузка...</tr>
        </tbody>
      );
    else if (filteredItems?.length === 0)
      setTableContent(
        <tbody className={style.notFound}>
          <tr>Не найдено репозитариев</tr>
        </tbody>
      );
    else if (error) setTableContent(<tr> Ошибка при запросе </tr>);
    else
      setTableContent(
        <tbody onClick={handleClickOpen}>
          {filteredItems?.map((item: IItem, index) => (
            <Row item={item} key={index} setTargetItem={setTargetItem} />
          ))}
        </tbody>
      );
  }, [error, filteredItems, isFetching]);

  return tableContent;
};

export default TableBody;
