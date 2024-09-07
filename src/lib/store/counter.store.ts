import { create } from "zustand";

type CounterStoreType = {
  counter: number;
  setCounter: (newCart: number) => void;
  resetCounter: () => void;
};

const useCounterStore = create<CounterStoreType>((set) => ({
  counter: 0,
  setCounter: (newCounter: number) => {
    set({
      counter: newCounter,
    });
  },

  resetCounter: () => {
    set({ counter: 0 });
  },
}));

export default useCounterStore;
