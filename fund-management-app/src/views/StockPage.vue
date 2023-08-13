<template>
  <div>
    <div>
      <div class="table-operations">
        <h1>Stock List</h1>
        <a-button v-show="isSorted" @click="clearAll">Clear sorters</a-button>
      </div>
      <div class="table-container">
        <a-table
          :columns="columns"
          :data-source="stocks"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { apiService } from "@/services/fundAPI";
import { AButton, ATable } from "ant-design-vue";
import { computed, ref, h, onMounted } from "vue";
import { FallOutlined, RiseOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { apiService } from "@/services/apiService";

export default {
  components: {
    AButton,
    ATable,
  },
  setup() {
    const sortedInfo = ref();
    const router = useRouter();
    const stocks = ref([]);
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
          dataIndex: "Revenue",
          key: "Revenue",
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

    onMounted(async () => {
      try {
        stocks.value = await apiService.getAllStock();
      } catch (error) {
        console.log("Error fetching stocks:", error);
      }
    });

    return {
      stocks: stocks,
      columns,
      handleChange,
      clearAll,
      isSorted,
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

.table-container {
  max-height: calc(100vh - 300px); /* Adjust the value as needed */
  overflow-y: auto;
}
</style>
