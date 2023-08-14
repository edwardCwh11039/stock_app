import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    userName: "",
    balance: 10000, // Initial balance, you can set it to whatever value you prefer
    stocks: [],
  }),
  getters: {
    getBalance: (state) => state.balance,
    getStocks: (state) => state.stocks,
  },
  actions: {
    login(user) {
      this.userName = user.username;
      this.balance = user.balance * 100;
    },
    updateBalance(stock) {
      this.balance =
        stock.type == "buy"
          ? this.balance - stock.amount * stock.eachPrice
          : this.balance + stock.amount * stock.eachPrice;
    },

    addStock(stock) {
      this.stocks.push(stock);
      console.log("before: ", this.balance);

      this.updateBalance(stock);
      console.log("after: ", this.balance);
    },

    removeStock(stock) {
      const index = this.stocks.findIndex(
        (item) => item.symbol === stock.symbol
      );
      if (index !== -1) {
        this.stocks.splice(index, 1);
      }
    },
    hasStock(symbol) {
      return this.stocks.some((stock) => stock.symbol === symbol);
    },
  },
});
