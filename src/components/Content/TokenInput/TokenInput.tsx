import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { saveToken } from "../../../api/tokenService";

// Создаем стилизованный компонент Dialog с использованием темы Material-UI
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Компонент для ввода и сохранения токена GitHub
const TokenInput = () => {
  // Локальное состояние для управления открытием диалога и значением токена
  const [open, setOpen] = useState<boolean>(true);
  const [tokenValue, setTokenValue] = useState<string>("");

  // Функция для обработки сохранения токена
  const handleSaveToken = () => {
    // Проверка длины токена
    if (tokenValue.length < 40) {
      alert("Ошибка. Длинна токена должна составлять 40 символов.");
    } else {
      // Сохранение токена и закрытие диалога
      saveToken(tokenValue);
      setOpen(false);
      setTokenValue("");
    }
  };

  return (
    <>
      {/* Диалог для ввода токена */}
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Введите токен GitHub
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            Для работы с репозиториями на GitHub через наше приложение, нам
            потребуется ваш персональный токен доступа. Это необходимо для
            выполнения операций, таких как поиск репозиториев, получение
            информации о них и т.д.
          </Typography>
          {/* Аккордеон с информацией о безопасности */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 style={{ margin: "0" }}>Это безопасно?</h3>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                Ваш токен будет использоваться исключительно для взаимодействия
                с GitHub API. Мы сохраняем его в виде куки в вашем браузере, и
                он никуда больше не передается.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Аккордеон с инструкцией по получению токена */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h3 style={{ margin: "0" }}>Как получить токен:</h3>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                <ol>
                  <li> Войдите в свой GitHub аккаунт.</li>
                  <li>
                    Перейдите в&nbsp;
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noreferrer"
                    >
                      настройки доступа
                    </a>
                    .
                  </li>
                  <li> Нажмите на кнопку "Generate new token".</li>
                  <li>
                    Укажите необходимые права доступа (например, доступ к
                    репозиториям).
                  </li>
                  <li>
                    Скопируйте созданный токен и вставьте его в поле ниже.
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <TextField
          sx={{ margin: 2 }}
          id="outlined-basic"
          label="Введите ваш токен"
          variant="outlined"
          value={tokenValue}
          onChange={(e) => setTokenValue(e.target.value)}
        />
        <DialogActions>
          <Button autoFocus onClick={handleSaveToken}>
            Сохранить токен
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default TokenInput;
