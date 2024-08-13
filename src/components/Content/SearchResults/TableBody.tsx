import { FC, useEffect, useState } from "react";
import style from "../style.module.scss";
import { Row } from "./Row";
import Skeleton from "@mui/material/Skeleton";
import { IItem } from "./Table";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useDispatch } from "../../../redux/hooks";
import { removeToken } from "../../../redux/auth";

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
  const dispatch = useDispatch();

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
    else if (error)
      setTableContent(
        <tbody className={style.notFound}>
          <tr>
            Ошибка при запросе. Похоже, введённый вами токен недействителен или
            имеет ошибку. Пожалуйста, попробуйте ввести токен ещё раз.
            Убедитесь, что он действителен и не содержит ошибок.
            <tr>
              <Button
                variant="contained"
                onClick={() => dispatch(removeToken())}
              >
                Ввести токен
              </Button>
            </tr>
          </tr>
        </tbody>
      );
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
