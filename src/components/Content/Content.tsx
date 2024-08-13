import { FC, useEffect, useState } from "react";
import { useGetReposQuery } from "../../api/api";
import InfoBlock from "./InfoBlock/InfoBlock";
import style from "./style.module.scss";
import Welcom from "./Welcom";
import Table, { IItem } from "./SearchResults/Table";
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
export const Content: FC<IContentProps> = ({
  searchText,
  targetItem,
  setTargetItem,
}) => {
  const { data, error, isFetching } = useGetReposQuery({
    query: searchText,
    first: 100,
    after: null,
  });
  const hasToken = useSelector((state: RootState) => state.auth.hasToken);
  const [open, setOpen] = useState(false);
  const screenWidth = window.innerWidth;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!hasToken) {
    return <TokenInput />;
  }

  return (
    <div className={style.content}>
      {!searchText ? (
        <Welcom />
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
            <InfoBlock item={targetItem} />
          ) : (
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
