import { FC, useEffect, useState } from "react";
import style from "../style.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import TableHeader, { Direction } from "./TableHeader";
import TableBody from "./TableBody";

// типизация элементов в массиве
export interface IItem {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  languages: Array<string>;
  primaryLanguage: string | undefined;
  licenseInfo: string | undefined;
}
interface ITableProps {
  items: IItem[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
  setTargetItem: (arg: IItem | null) => void;
  handleClickOpen: () => void;
}
// тип для объекта фильтрации
export type FilterParametr = {
  target: "forkCount" | "stargazerCount" | "updatedAt" | null;
  direction: Direction | null;
};

const Table: FC<ITableProps> = ({
  items,
  isFetching,
  error,
  setTargetItem,
  handleClickOpen,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [itemsData, setItemsData] = useState<IItem[]>();
  const [filteredItems, setFilteredItems] = useState<IItem[]>();
  const [sortParametr, setSortParametr] = useState<FilterParametr>({
    target: null,
    direction: null,
  });

  useEffect(() => {
    setItemsData(items);
  }, [items]);

  //  задаем в фильтрованный массив нужное количество элементов
  //  в нашем случае изначально их 10, но при изменении rowsPerPage
  //  будет меняться количество строк в таблице
  useEffect(() => {
    setFilteredItems(itemsData?.slice(0, rowsPerPage));
  }, [itemsData, rowsPerPage]);

  // сортировка по направлению и типу (звезды,форки, дата)
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
      setFilteredItems(itemsData.slice(0, rowsPerPage));
      setPage(0);
    }
  }, [rowsPerPage, sortParametr]);

  // изменении страницы
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
  // изменение количества строк в таблице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={style.searchTable}>
      <table>
        <TableHeader setSortParametr={setSortParametr} />
        <TableBody
          setTargetItem={setTargetItem}
          isFetching={isFetching}
          filteredItems={filteredItems}
          error={error}
          handleClickOpen={handleClickOpen}
        />
      </table>
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
