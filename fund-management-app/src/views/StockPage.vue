<template>
  <a-card>
    <div class="table-operations">
      <h1>Stock List</h1>
      <a-button v-show="isSorted" @click="clearAll">Clear sorters</a-button>
    </div>
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    <div v-else>
      <div class="table-container">
        <a-table
          :columns="columns"
          :data-source="stocks"
          @change="handleChange"
          :scroll="{ y: '65vh' }"
        />
      </div>
    </div>
  </a-card>
</template>

<script>
import { computed, ref, h } from "vue";
import { FallOutlined, RiseOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { apiService } from "@/services/apiService";

export default {
  setup() {
    const sortedInfo = ref();
    const router = useRouter();
    const stocks = ref([]);
    const loading = ref(true);
    const fetchData = async () => {
      loading.value = true;
      await apiService.getAllStock().then((res) => {
        stocks.value = res;
        loading.value = false;
      });
    };
    fetchData();
    const columns = computed(() => {
      const sorted = sortedInfo.value || {};
      return [
        {
          title: "Stock",
          key: "companyNameSymbol",
          customRender: (cell) => {
            const isSamllDevice = window.innerWidth <= 576;

            const logoNode = h("img", {
              src: cell.record.logoUrl,
              alt: cell.record.companyName,
              style: {
                width: "30px",
                height: "30px",
                marginRight: "10px",
              },
            });
            const symbolNode = h("div", null, cell.record.symbol);
            const companyNameNode = h(
              "div",
              {
                style: {
                  fontWeight: "bold",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "150px",
                },
              },
              cell.record.companyName
            );

            return isSamllDevice
              ? h(
                  "div",
                  {
                    onClick: () =>
                      router.push({
                        name: "StockDetail",
                        params: { symbol: cell.record.symbol },
                      }),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "200px",
                      marginRight: "0",
                    },
                  },
                  [logoNode, symbolNode]
                )
              : h(
                  "div",
                  {
                    onClick: () =>
                      router.push({
                        name: "StockDetail",
                        params: { symbol: cell.record.symbol },
                      }),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "200px",
                      marginRight: "0",
                    },
                  },
                  [logoNode, h("div", null, [companyNameNode, symbolNode])]
                );
          },
          responsive: ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"],
        },
        {
          title: "Revenue",
          dataIndex: "revenue",
          key: "revenue",
          customRender: ({ text }) => {
            return h("span", { fontWeight: "bold" }, `$  ${text}`);
          },
          responsive: ["xxxl", "xxl", "xl", "lg", "md"],
        },
        {
          title: "Market Cap",
          dataIndex: "marketCap",
          key: "marketCap",
          customRender: ({ text }) => {
            return h("span", { fontWeight: "bold" }, `$  ${text}`);
          },
          responsive: ["xxxl", "xxl", "xl", "lg", "md"],
        },
        {
          title: "Price Change",
          dataIndex: "priceChange",
          key: "priceChange",
          sorter: (a, b) => {
            const aValue = parseFloat(a.priceChange.replace("%", ""));
            const bValue = parseFloat(b.priceChange.replace("%", ""));
            return aValue - bValue;
          },
          sortOrder: sorted.columnKey === "priceChange" && sorted.order,
          customRender: ({ text, record }) => {
            const color = record.priceChange.includes("-") ? "red" : "green";
            return record.priceChange.includes("-")
              ? [
                  h(FallOutlined, { style: { color } }),
                  h(
                    "span",
                    {
                      style: { color, marginLeft: "10px", fontWeight: "bold" },
                    },
                    text
                  ),
                ]
              : [
                  h(RiseOutlined, { style: { color } }),
                  h(
                    "span",
                    {
                      style: { color, marginLeft: "5px", fontWeight: "bold" },
                    },
                    text
                  ),
                ];
          },
          responsive: ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"],
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.Price - b.Price,
          sortOrder: sorted.columnKey === "price" && sorted.order,
          customRender: ({ text }) => {
            return h(
              "span",
              {
                style: {
                  fontWeight: "bold",
                  fontFamily: "Montserrat, sans-serif",
                },
              },
              `$ ${text}`
            );
          },
          responsive: ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"],
        },
      ];
    });

    const isSorted = computed(() => {
      return (
        sortedInfo.value &&
        (sortedInfo.value.columnKey || sortedInfo.value.order)
      );
    });

    const handleChange = (pagination, filters, sorter) => {
      sortedInfo.value = sorter;
    };

    const clearAll = () => {
      sortedInfo.value = null;
    };

    return {
      stocks: stocks,
      columns,
      handleChange,
      clearAll,
      isSorted,
      loading,
    };
  },
};
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}

.loading {
  text-align: center;
}
</style>
