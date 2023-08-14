<template>
  <a-card>
    <div class="investment-page">
      <h1>Investment History</h1>
      <div v-if="stocks.length < 1">
        <a-alert
          message="Info Text"
          description="Your Trade list is empty."
          type="info"
          show-icon

        />
      </div>
      <div v-else>
        <div class="scrollable-list">
          <a-row
            :gutter="8"
            v-for="(stock, index) in stocks"
            :key="index"
            :style="getRowStyle(stock.type)"
            class="list-item"
          >
            <a-col :span="2" :style="{ textTransform: 'capitalize' }">
              {{ stock.type }}
            </a-col>
            <a-col :span="2">{{ stock.amount }} x</a-col>
            <a-col :span="6">
              <div class="item-content">
                <a-avatar
                  v-if="!isSmallDevice"
                  :src="stock.logoUrl"
                  class="avatar"
                />
                <div class="name-symbol">
                  <div class="company-name">{{ stock.companyName }}</div>
                  <div class="symbol">{{ stock.symbol }}</div>
                </div>
              </div>
            </a-col>

            <a-col :span="4">$ {{ stock.eachPrice }}</a-col>

            <a-col :span="4">
              $ {{ Number(stock.eachPrice * stock.amount).toFixed(2) }}
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { useStore } from "@/store/data-context";
import { ref, onMounted } from "vue";

export default {
  name: "InvestmentPage",
  setup() {
    const store = useStore();
    const stocks = store.getStocks;
    const isSmallDevice = ref(false);

    const getRowStyle = (type) => {
      if (type === "buy") {
        return {
          backgroundColor: "#C6F6D5", // Green background for buy rows
        };
      } else if (type === "sell") {
        return {
          backgroundColor: "#FED7D7", // Red background for sell rows
        };
      }
    };

    onMounted(() => {
      isSmallDevice.value = window.innerWidth <= 576;
    });
    // Use computed property to get investment history from the store
    return { stocks, getRowStyle, isSmallDevice };
  },
};
</script>

<style scoped>
.investment-page {
  margin: 0 auto;
}

.list-item {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  font-weight: bold;
}

.item-content {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.symbol {
  font-weight: normal;
}
.company-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
