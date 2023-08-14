import axios from "axios";
import { message } from "ant-design-vue";

const API_BASE_URL = "http://localhost:3001/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
});

class BaseApiService {
  async get(path, params) {
    path = this.getPath(path);
    path = params
      ? `${path}?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : path;

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

  getPath(path) {
    return !Array.isArray(path) ? String(path) : path.join("/");
  }
}

class ApiService extends BaseApiService {
  getAllStock() {
    return this.get(["stock", "all"]).then(this.showMessage());
  }
  getStock(symbol) {
    return this.get(["stock", symbol]).then(this.showMessage());
  }
  searchStock(symbol) {
    return this.get(["stock"], { query: symbol }).then(this.showMessage());
  }
}

export const apiService = new ApiService();

export default apiService;
