import { FC, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FilterParametr } from "./Table";

interface ITableHeaderProps {
  setSortParametr: (arg: FilterParametr) => void;
}
export type Direction = "up" | "down";

const TableHeader: FC<ITableHeaderProps> = ({ setSortParametr }) => {
  const [forkFilterArrow, setForkFilterArrow] = useState<Direction>("up");
  const [starsFilterArrow, setStarsFilterArrow] = useState<Direction>("up");
  const [dateFilterArrow, setDateFilterArrow] = useState<Direction>("up");

  const handleChangeForkFilterArrow = () => {
    if (forkFilterArrow === "up") {
      setForkFilterArrow("down");
      setSortParametr({ target: "forkCount", direction: "down" });
    } else {
      setForkFilterArrow("up");
      setSortParametr({ target: "forkCount", direction: "up" });
    }
  };
  const handleChangeStarsFilterArrow = () => {
    if (starsFilterArrow === "up") {
      setStarsFilterArrow("down");
      setSortParametr({ target: "stargazerCount", direction: "down" });
    } else {
      setSortParametr({ target: "stargazerCount", direction: "up" });
      setStarsFilterArrow("up");
    }
  };
  const handleChangeDatekFilterArrow = () => {
    if (dateFilterArrow === "up") {
      setDateFilterArrow("down");
      setSortParametr({ target: "updatedAt", direction: "down" });
    } else {
      setDateFilterArrow("up");
      setSortParametr({ target: "updatedAt", direction: "up" });
    }
  };

  return (
    <thead>
      <tr>
        <th>Название</th>
        <th>Язык</th>
        <th>
          <div onClick={() => handleChangeForkFilterArrow()}>
            <span>Число форков</span>
            {forkFilterArrow === "up" ? (
              <ArrowUpwardIcon />
            ) : (
              <ArrowDownwardIcon />
            )}
          </div>
        </th>
        <th>
          <div onClick={() => handleChangeStarsFilterArrow()}>
            <span>Число звезд</span>
            {starsFilterArrow === "up" ? (
              <ArrowUpwardIcon />
            ) : (
              <ArrowDownwardIcon />
            )}
          </div>
        </th>
        <th>
          <div onClick={() => handleChangeDatekFilterArrow()}>
            <span>Дата обновления</span>
            {dateFilterArrow === "up" ? (
              <ArrowUpwardIcon />
            ) : (
              <ArrowDownwardIcon />
            )}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
