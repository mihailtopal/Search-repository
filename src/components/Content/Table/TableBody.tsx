import { FC } from "react";
import style from "./style.module.scss";
import Row from "./Row";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useAuthStore } from "../../../store/store";
import { IItem } from "../../../types/types";

interface ITableBodyProps {
  isFetching: boolean;
  filteredItems: IItem[] | undefined;
  error: any;
  setTargetItem: (arg: IItem | null) => void;
  handleClickOpen: () => void;
}
// Компонент тело таблицы
const TableBody: FC<ITableBodyProps> = ({
  isFetching,
  filteredItems,
  error,
  setTargetItem,
  handleClickOpen,
}) => {
  const removeToken = useAuthStore((state) => state.removeToken); // Функция переключения состояния наличия токена на false

  // Функции для отображения разных состояний таблицы
  const renderLoadingState = () => (
    <tbody className={style.loading}>
      <Skeleton component="tr" variant="rectangular" animation="wave" />
      <tr>Загрузка...</tr>
    </tbody>
  );
  // Функции для отображения отсутствия репозиториев
  const renderNotFoundState = () => (
    <tbody className={style.notFound}>
      <tr>Не найдено репозиториев</tr>
    </tbody>
  );
  // Функции для отображения ошибки
  const renderErrorState = () => (
    <tbody className={style.notFound}>
      <tr>
        Ошибка при запросе. Похоже, введённый вами токен недействителен или
        имеет ошибку. Пожалуйста, попробуйте ввести токен ещё раз. Убедитесь,
        что он действителен и не содержит ошибок.
        <tr>
          <Button variant="contained" onClick={() => removeToken()}>
            Ввести токен
          </Button>
        </tr>
      </tr>
    </tbody>
  );
  // Функции для отображения найденных элементов
  const renderDataState = () => (
    <tbody onClick={handleClickOpen}>
      {filteredItems?.map((item, index) => (
        <Row item={item} key={index} setTargetItem={setTargetItem} />
      ))}
    </tbody>
  );

  // Логика выбора контента для отображения
  const getTableContent = () => {
    if (isFetching) return renderLoadingState();
    if (error) return renderErrorState();
    if (filteredItems?.length === 0) return renderNotFoundState();
    return renderDataState();
  };

  return getTableContent();
};

export default TableBody;
