<template>
  <div class="trending-stocks">
    <a-card>
      <a-row justify="space-between">
        <a-col><h2>Trending Stock</h2></a-col>
        <a-col>
          <a-radio-group v-model:value="selectedType">
            <a-radio-button value="all">All</a-radio-button>
            <a-radio-button value="winners">Winners</a-radio-button>
            <a-radio-button value="losers">Losers</a-radio-button>
            <a-radio-button value="popular">Popular</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <div v-if="loading" class="loading"><a-spin size="large" /></div>
      <div v-else class="stocks-list-container">
        <a-table
          :data-source="filteredData"
          :showHeader="false"
          :columns="columns"
        />
      </div>
    </a-card>
  </div>
</template>

<script>
import { computed, ref, watch, h } from "vue";
import { FallOutlined, RiseOutlined } from "@ant-design/icons-vue";
import { alphaApi } from "@/services/alphaAPI";

export default {
  setup() {
    const winners = ref([]);
    const losers = ref([]);
    const popular = ref([]);
    const selectedType = ref("all");
    const filteredData = ref([]);
    const loading = ref(true);
    const fetchData = async () => {
      loading.value = true;
      await alphaApi.topGainersLosers().then((res) => {
        winners.value = res.top_gainers;
        losers.value = res.top_losers;
        popular.value = res.most_actively_traded;
        filteredData.value = [...res.top_gainers, ...res.top_losers, ...res.most_actively_traded];
        loading.value = false;
      });
    };
    fetchData();

    const updateFilteredData = () => {
      if (selectedType.value === "winners") {
        return winners.value;
      } else if (selectedType.value === "losers") {
        return losers.value;
      } else if (selectedType.value === "popular") {
        return popular.value;
      } else {
        return [...winners.value, ...losers.value, ...popular.value];
      }
    };

    watch(selectedType, () => {
      filteredData.value = updateFilteredData(); // Force reactivity
    });

    const columns = computed(() => {
      return [
        {
          title: "Stock",
          dataIndex: "ticker",
          key: "ticker",
        },
        {
          title: "Price Change",
          dataIndex: "change_percentage",
          key: "change_percentage",
          customRender: ({ text, record }) => {
            const color = record.change_percentage.includes("-")
              ? "red"
              : "green";
            return record.change_percentage.includes("-")
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
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
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
        },
      ];
    });


    return {
      selectedType,
      filteredData,
      columns,
      loading,
    };
  },
};
</script>

<style>
.stocks-list-container {
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.loading {
  text-align: center;
}
</style>
