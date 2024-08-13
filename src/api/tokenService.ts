import Cookies from "js-cookie";

export const saveToken = (token: string) => {
  // Сохраняем токен в куки
  Cookies.set("github_token", token, { expires: 7 }); // Токен сохранится на 7 дней
};
