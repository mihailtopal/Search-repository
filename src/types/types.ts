// Тип элементов таблицы
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
// Тип возможных направлений сортировки
export type Direction = "up" | "down" | null;

// Тип целей сортировки
export type SortTarget = "forkCount" | "stargazerCount" | "updatedAt";

// Тип состояния сортировки
export interface SortState {
  forkCount: Direction;
  stargazerCount: Direction;
  updatedAt: Direction;
}
// Тип элементов headersItems

export type HeaderItem = {
  key: SortTarget;
  label: string;
};
// Тип для объекта фильтрации (сортировка по параметру и направлению)
export type FilterParametr = {
  target: SortTarget | null;
  direction: Direction | null;
};
// Тип стора
export interface ITokenState {
  hasToken: boolean;
  setToken: () => void;
  removeToken: () => void;
}
