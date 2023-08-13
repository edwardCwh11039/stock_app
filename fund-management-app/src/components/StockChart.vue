<template>
  <div>
    <div v-if="isLoading">
      <a-spin size="large" tip="loading"></a-spin>
    </div>
    <div v-else>
      <Line id="stockLine" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import { Line } from "vue-chartjs";
import "chart.js/auto";
import { stockExampleData } from "@/store/stockDataExample";
export default {
  components: { Line },
  setup(props, context) {
    const route = useRoute();
    const symbol = ref(route.params.symbol);
    const dailyStockData = ref(null);
    const isLoading = ref(true);
    const fetchDailyStockData = async () => {
      try {
        const apiKey = "4L899V8QWQXTQP85";
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
            symbol.value
          }&apikey=${symbol.value === "IBM" ? "demo" : apiKey}`
        );
        if (response.status === 200 && !!response.data["Time Series (Daily)"]) {
          dailyStockData.value = await response.data["Time Series (Daily)"];
        } else {
          // due to api limit, if error happen use example data
          dailyStockData.value = stockExampleData;
        }
      } catch (error) {
        console.error("Error fetching daily stock data:", error);
      } finally {
        formatData(dailyStockData.value);
        isLoading.value = false;
      }
    };
    const chartData = ref(null);
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          bottom: 20,
          left: 0,
          right: 0,
          top: 0,
        },
      },
    };

    onMounted(() => {
      fetchDailyStockData();
    });

    const formatData = (data) => {
      const chartLabels = [];
      const chartValues = [];
      for (const date in data) {
        chartLabels.push(date);
        chartValues.push(parseFloat(data[date]["1. open"]));
      }
      chartData.value = {
        labels: chartLabels.reverse(),
        datasets: [
          {
            label: symbol.value + "Stock Price",
            data: chartValues.reverse(),
            borderColor: "blue",
            fill: true,
          },
        ],
      };
      context.emit("currentPrice", chartValues[chartValues.length - 1]);
    };

    return {
      chartData,
      chartOptions,
      isLoading,
      symbol,
      Line,
    };
  },
};
</script>
