import { IUserDataState } from "@/lib/features/test3/userDataSlice";

export const setStorageData = (data: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', data);
  }
};

export const getStorageData = (): IUserDataState[] | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  return null;
};
