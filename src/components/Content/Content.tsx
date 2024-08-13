import { FC, useState } from "react";
import { useGetReposQuery } from "../../api/api";
import InfoBlock from "./InfoBlock/InfoBlock";
import style from "./style.module.scss";
import Welcome from "./Welcome";
import Table, { IItem } from "./Table/Table";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TokenInput from "./TokenInput/TokenInput";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IContentProps {
  searchText: string;
  targetItem: IItem | null;
  setTargetItem: (arg: IItem | null) => void;
}

// Основной компонент для отображения содержимого
export const Content: FC<IContentProps> = ({
  searchText, // Поисковый текст для запроса
  targetItem, // Текущий выбранный элемент
  setTargetItem, // Функция для установки выбранного элемента
}) => {
  // Хук для получения данных репозиториев
  const { data, error, isFetching } = useGetReposQuery({
    query: searchText,
    first: 100,
    after: null,
  });

  // Получение состояния наличия токена из Redux
  const hasToken = useSelector((state: RootState) => state.auth.hasToken);

  // Локальное состояние для управления открытием/закрытием диалога
  const [open, setOpen] = useState(false);

  // Ширина экрана для адаптивного отображения
  const screenWidth = window.innerWidth;

  // Обработчик открытия диалога
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Обработчик закрытия диалога
  const handleClose = () => {
    setOpen(false);
  };

  // Если токен отсутствует, показываем компонент для ввода токена
  if (!hasToken) {
    return <TokenInput />;
  }

  return (
    <div className={style.content}>
      {!searchText ? (
        // Если нет текста поиска, показываем приветственное сообщение
        <Welcome />
      ) : (
        <div className={style.searchContent}>
          <div className={style.searhContainer}>
            <h3 className={style.searhTitle}>Результаты поиска</h3>
            <Table
              handleClickOpen={handleClickOpen}
              items={data}
              error={error}
              isFetching={isFetching}
              setTargetItem={setTargetItem}
            />
          </div>
          {screenWidth > 800 ? (
            // Если ширина экрана больше 800px, показываем InfoBlock
            <InfoBlock item={targetItem} />
          ) : (
            // Для узких экранов показываем InfoBlock в диалоге
            <Dialog fullScreen open={open} onClose={handleClose}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{ position: "absolute", right: "10px", top: "10px" }}
              >
                <CloseIcon />
              </IconButton>
              <div className={style.infoBlockInDialog}>
                <InfoBlock item={targetItem} />
              </div>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};
