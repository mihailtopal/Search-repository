import { FC, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FilterParametr } from "./Table";

// Типизация возможных направлений сортировки
export type Direction = "up" | "down" | null;

// Типизация целей сортировки
export type SortTarget = "forkCount" | "stargazerCount" | "updatedAt";

// Типизация состояния сортировки
interface SortState {
  forkCount: Direction;
  stargazerCount: Direction;
  updatedAt: Direction;
}

// Типизация пропсов компонента
interface ITableHeaderProps {
  setSortParametr: (arg: FilterParametr) => void;
}

// Типизация элементов headersItems
type HeaderItem = {
  key: SortTarget;
  label: string;
};

const TableHeader: FC<ITableHeaderProps> = ({ setSortParametr }) => {
  // Состояние для направления сортировки по столбцам
  const [sortState, setSortState] = useState<SortState>({
    forkCount: "up",
    stargazerCount: "up",
    updatedAt: "up",
  });

  // Универсальный обработчик для изменения направления сортировки
  const handleSortChange = (target: SortTarget) => {
    setSortState((prevState) => {
      const newDirection = prevState[target] === "up" ? "down" : "up";
      setSortParametr({ target, direction: newDirection });
      return { ...prevState, [target]: newDirection };
    });
  };

  // Типизированный массив для соритрируемых заголовков
  const headersItems: HeaderItem[] = [
    { key: "forkCount", label: "Число форков" },
    { key: "stargazerCount", label: "Число звезд" },
    { key: "updatedAt", label: "Дата обновления" },
  ];

  return (
    <thead>
      <tr>
        <th>Название</th>
        <th>Язык</th>
        {headersItems.map((headerItem) => (
          <th key={headerItem.key}>
            <div onClick={() => handleSortChange(headerItem.key)}>
              <span>{headerItem.label}</span>
              {sortState[headerItem.key] === "up" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
