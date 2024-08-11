import { FC } from "react";
import style from "./style.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import { IItem } from "../SearchResults/Table";
interface IInfoBlockProps {
  item: IItem | null;
}
const InfoBlock: FC<IInfoBlockProps> = ({ item }) => {
  const formattedNumber = new Intl.NumberFormat("ru-RU").format(
    item?.stargazerCount || 0
  );
  return (
    <div className={style.infoBlock}>
      
      {!item ? (
        <div className={style.pickRep}>Выберите репозитарий</div>
      ) : (
        <div>
          <h3 className={style.infoTitle}> {item?.name}</h3>
          <div className={style.primeInfo}>
            <div className={style.lang + " " + style.primeLang}>
              {item?.primaryLanguage || "Язык не задан"}
            </div>
            <div className={style.stars}>
              <StarRateIcon
                sx={{ color: "#FFB400", fontSize: "20px", marginRight: "10px" }}
              />
              <div className={style.starsCount}>{formattedNumber}</div>
            </div>
          </div>
          <div className={style.languages}>
            {item?.languages.map((lang) => (
              <div className={style.lang}>{lang}</div>
            ))}
          </div>
          <div className={style.description}>
            <span>Описание:&nbsp;</span>
            {item.description || "Описание не указано"}
          </div>
          <div className={style.license}>
            <span> Лицензия:&nbsp;</span>
            {item.licenseInfo || "Лицензия не указана"}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBlock;
