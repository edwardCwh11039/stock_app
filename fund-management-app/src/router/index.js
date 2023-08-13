import { createRouter, createWebHistory } from "vue-router";
import StockPage from "@/views/StockPage.vue";
import InvestmentPage from "@/views/InvestmentPage.vue";
import OverviewPage from "@/views/OverviewPage.vue";
import NewsPage from "@/views/NewsPage.vue";
import StockDetailPage from "@/views/StockDetailPage.vue";
import {
  AppstoreOutlined,
  FundProjectionScreenOutlined,
  FolderOpenOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";

export const routes = [
  {
    path: "/",
    component: OverviewPage,
    name: "Overview",
    meta: { icon: <AppstoreOutlined />, name: "overview" },
  },
  {
    path: "/stock",
    component: StockPage,
    name: "Stock",
    meta: { icon: <FundProjectionScreenOutlined />, name: "stock" },
  },
  {
    path: "/investment",
    component: InvestmentPage,
    name: "Investment",
    meta: { icon: <FolderOpenOutlined />, name: "investment" },
  },
  {
    path: "/news",
    component: NewsPage,
    name: "News",
    meta: { icon: <CommentOutlined />, name: "news" },
  },
  {
    path: "/stock/:symbol",
    component: StockDetailPage,
    props: true,
    name: "StockDetail",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
