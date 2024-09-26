import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setStorageData } from '@/utils/local-storage';

// Type for our state
export interface IUserDataState {
  title: string;
  fname: string;
  lname: string;
  birthday: string;
  nationality: string;
  citizenId?: string;
  citizenId1?: string;
  citizenId2?: string;
  citizenId3?: string;
  citizenId4?: string;
  citizenId5?: string;
  gender: string;
  mobilePrefix: string;
  mobile: string;
  passportNo?: string;
  expectedSalary: string;
}

export interface IDataState {
  selectedEditDataIdx?: number | null;
  selectedData?: number[] | [];
  listDataUser?: IUserDataState[] | [];
}

export interface IEditDataPayload {
  index: number;
  upadateData?: IUserDataState | null;
}

// Initial state
export const initialUserDataState: IUserDataState = {
  title: '',
  fname: '',
  lname: '',
  birthday: '',
  nationality: '',
  citizenId: '',
  gender: '',
  mobilePrefix: '',
  mobile: '',
  passportNo: '',
  expectedSalary: '',
};

const initialDataState: IDataState = {
  selectedEditDataIdx: null,
  selectedData: [],
  listDataUser: [],
};

// Actual Slice
const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    value: initialDataState,
  },
  reducers: {
    setInitialUserData(state, action: PayloadAction<IUserDataState[]>) {
      state.value = {
        ...state.value,
        listDataUser: action.payload,
      };
    },

    addUserData(state, action: PayloadAction<IUserDataState>) {
      const { listDataUser = [] } = state.value;
      const tempList = [...listDataUser, action.payload];
      setStorageData(JSON.stringify(tempList));
      state.value = {
        ...state.value,
        listDataUser: tempList,
      };
    },

    selectEditUserData(state, action: PayloadAction<number | null>) {
      const { payload } = action;
      state.value = {
        ...state.value,
        selectedEditDataIdx: payload,
      };
    },

    editUserData(state, action: PayloadAction<IEditDataPayload>) {
      const { listDataUser = [] } = state.value;
      const { index, upadateData } = action.payload;
      let temp = JSON.parse(JSON.stringify(listDataUser));
      temp[index] = upadateData;
      setStorageData(JSON.stringify(temp));
      state.value = {
        ...state.value,
        selectedEditDataIdx: null,
        listDataUser: temp,
      };
    },

    deleteUserData(state, action: PayloadAction<number>) {
      const { listDataUser = [] } = state.value;
      const { payload } = action;
      let temp = [...listDataUser];

      if (temp && temp.length == 1) {
        temp = [];
      } else {
        temp.splice(payload, 1);
      }

      setStorageData(JSON.stringify(temp));
      state.value = {
        ...state.value,
        listDataUser: temp,
      };
    },

    selectDeleteUserData(state, action: PayloadAction<number[]>) {
      const { payload } = action;
      console.log(payload);

      state.value = {
        ...state.value,
        selectedData: payload,
      };
    },

    deleteMultiUserData(state) {
      const { selectedData = [], listDataUser = [] } = state.value;
      let temp = [...listDataUser];

      if (selectedData.length > 0) {
        if (selectedData && selectedData.length == 1) {
          temp = [];
        } else {
          selectedData.map((idx) => {
            temp.splice(idx, 1);
          });
        }

        setStorageData(JSON.stringify(temp));
        state.value = {
          ...state.value,
          listDataUser: temp,
          selectedData: [],
        };
      }
    },

    clearAllData(state) {
      setStorageData(JSON.stringify([]));
      state.value = initialDataState;
    },
  },
});

export const { setInitialUserData, addUserData, selectEditUserData, editUserData, deleteUserData, selectDeleteUserData, deleteMultiUserData, clearAllData } = userDataSlice.actions;

export default userDataSlice;
