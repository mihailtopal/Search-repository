import { FC, useEffect, useState } from "react";
import style from "./style.module.scss";
import TablePagination from "@mui/material/TablePagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { FilterParametr, IItem } from "../../../types/types";

// типизация пропсов
interface ITableProps {
  items: IItem[] | undefined;
  error: Error | null;
  isFetching: boolean;
  setTargetItem: (arg: IItem | null) => void;
  handleClickOpen: () => void;
}

const Table: FC<ITableProps> = ({
  items,
  isFetching,
  error,
  setTargetItem,
  handleClickOpen,
}) => {
  const [page, setPage] = useState(0); // Текущая страница
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество строк на странице
  const [itemsData, setItemsData] = useState<IItem[]>(); // Данные для таблицы
  const [filteredItems, setFilteredItems] = useState<IItem[]>(); // Отфильтрованные данные
  const [sortParametr, setSortParametr] = useState<FilterParametr>({
    target: null,
    direction: null,
  }); // Параметры сортировки

  // Обновляем данные таблицы при изменении props.items
  useEffect(() => {
    setItemsData(items);
  }, [items]);

  // Обновляем количество отображаемых элементов на странице при изменении rowsPerPage
  useEffect(() => {
    setFilteredItems(itemsData?.slice(0, rowsPerPage));
  }, [itemsData, rowsPerPage]);

  // Сортировка данных по выбранному параметру и направлению
  useEffect(() => {
    const { target, direction } = sortParametr;
    if (target && itemsData) {
      const sortedItems = [...itemsData].sort((a, b) => {
        const aValue =
          target === "updatedAt"
            ? new Date(a[target]).getTime()
            : (a[target] as number);
        const bValue =
          target === "updatedAt"
            ? new Date(b[target]).getTime()
            : (b[target] as number);
        if (direction === "up") return aValue - bValue;
        else return bValue - aValue;
      });
      setItemsData(sortedItems);
      setFilteredItems(sortedItems.slice(0, rowsPerPage)); // Обновляем отображаемые элементы после сортировки
      setPage(0); // Сбрасываем страницу на 0 при сортировке
    }
  }, [rowsPerPage, sortParametr]);

  // Обработка изменения страницы
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setFilteredItems(
      itemsData?.filter(
        (value, index) =>
          index >= newPage * rowsPerPage && index < (newPage + 1) * rowsPerPage
      )
    );
  };

  // Обработка изменения количества строк на странице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбрасываем страницу на 0 при изменении количества строк
  };

  return (
    <div className={style.searchTable}>
      <table>
        {/* Заголовок таблицы */}
        <TableHeader setSortParametr={setSortParametr} />
        {/* Тело таблицы с данными */}
        <TableBody
          setTargetItem={setTargetItem}
          isFetching={isFetching}
          filteredItems={filteredItems}
          error={error}
          handleClickOpen={handleClickOpen}
        />
      </table>
      {/* Пагинация для управления страницами и количеством строк на странице */}
      <TablePagination
        className={style.pagination}
        component="div"
        count={items?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default Table;
