import axios from "axios";
import { message } from "ant-design-vue";

const apiKey = "4L899V8QWQXTQP85";
const API_BASE_URL = "https://www.alphavantage.co";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
});

class BaseAlphaAPI {
  async get(params) {
    params["apikey"] = apiKey;
    let path = `query?${Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`;

    return axiosInstance
      .get(path)
      .then((res) => res.data)
      .catch((err) => this.errorHandler(err));
  }

  showMessage = () => (res) => {
    const { status } = res;
    const isError = status === "error";

    if (isError) {
      message.error(res.message);
    }

    return res;
  };

  errorHandler(err) {
    const msg = err.message;
    const code = err.code;

    return { msg, code };
  }
}

class AlphaAPI extends BaseAlphaAPI {
  getIntradayStock(symbol) {
    return this.get({
      function: "TIME_SERIES_INTRADAY",
      symbol: symbol,
      interval: "5min",
    }).then(this.showMessage());
  }
  getDailyStock(symbol) {
    return this.get({
      function: "TIME_SERIES_DAILY",
      symbol: symbol,
    }).then(this.showMessage());
  }
  topGainersLosers() {
    return this.get({
      function: "TOP_GAINERS_LOSERS",
    }).then(this.showMessage());
  }
  companyOverview(symbol) {
    return this.get({
      function: "OVERVIEW",
      symbol: symbol,
    }).then(this.showMessage());
  }
}

export const alphaApi = new AlphaAPI();

export default alphaApi;
