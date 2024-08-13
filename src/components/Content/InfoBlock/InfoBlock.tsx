import { FC } from "react";
import style from "./style.module.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import { IItem } from "../Table/Table";

// Интерфейс для пропсов компонента
interface IInfoBlockProps {
  item: IItem | null; // Выбранный элемент репозитория или null, если ничего не выбрано
}
// Компонент блока информации о репозитории
const InfoBlock: FC<IInfoBlockProps> = ({ item }) => {
  // Если элемент не выбран, показываем сообщение
  if (!item) {
    return <div className={style.pickRep}>Выберите репозиторий</div>;
  }

  // Форматируем количество звезд с учетом локализации (например, с пробелами для тысяч)
  const formattedNumber = new Intl.NumberFormat("ru-RU").format(
    item.stargazerCount
  );

  return (
    <div className={style.infoBlock}>
      <h3 className={style.infoTitle}>{item.name}</h3>
      {/* Основная информация: язык и количество звезд */}
      <div className={style.primeInfo}>
        <div className={`${style.lang} ${style.primeLang}`}>
          {item.primaryLanguage || "Язык не задан"}
        </div>
        <div className={style.stars}>
          <StarRateIcon
            sx={{ color: "#FFB400", fontSize: "20px", marginRight: "10px" }}
          />
          <div className={style.starsCount}>{formattedNumber}</div>
        </div>
      </div>

      {/* Список всех языков, используемых в репозитории */}
      <div className={style.languages}>
        {item.languages.map((lang, index) => (
          <div className={style.lang} key={index}>
            {lang}
          </div>
        ))}
      </div>

      {/* Описание репозитория */}
      <div className={style.description}>
        <span>Описание:&nbsp;</span>
        <div>{item.description || "Описание не указано"}</div>
      </div>

      {/* Лицензия репозитория */}
      <div className={style.license}>
        <span>Лицензия:&nbsp;</span>
        <div>{item.licenseInfo || "Лицензия не указана"}</div>
      </div>
    </div>
  );
};

export default InfoBlock;
