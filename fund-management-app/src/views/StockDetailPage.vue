<template>
  <div class="stock-detail">
    <a-col :span="24">
      <a-row justify="space-between">
        <a-col>
          <a-row>
            <a-col>
              <img :src="companyInfo.logoUrl" alt="Company Logo" class="logo" />
            </a-col>
            <a-col
              ><a-row>
                <h2>{{ companyInfo.companyName }}</h2>
              </a-row>
              <a-row>
                <p>{{ symbol }}</p>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col>
          <a-col class="price">
            <span>
              <b>$ {{ currentPrice }}</b>
            </span>
            <div :class="priceChangeClass">
              <div v-if="companyInfo.priceChange.includes('-')">
                <FallOutlined />{{ companyInfo.priceChange }}
              </div>
              <div v-else><RiseOutlined />{{ companyInfo.priceChange }}</div>
            </div>
          </a-col>
        </a-col>
      </a-row>
      <div :style="{ marginTop: '10px', marginBottom: '10px' }">
        <StockChart :symbol="symbol" @currentPrice="getPrice" />
      </div>
      <a-row justify="space-around">
        <a-col :span="10">
          <a-button
            class="buy-button"
            type="primary"
            @click="showModal('buy')"
            :disabled="!enoughMoney"
            block
          >
            Buy
          </a-button>
        </a-col>
        <a-col :span="10">
          <a-button
            class="sell-button"
            type="primary"
            danger
            @click="showModal('sell')"
            block
            :disabled="getBoughtStocks() < 1"
          >
            Sell {{ getBoughtStocks() }}
          </a-button>
        </a-col>
      </a-row>
    </a-col>
    <a-modal
      v-model:open="isModalVisible"
      :title="modalTitle"
      ok-text="Confirm"
      cancel-text="Cancel"
      @ok="handleModalConfirm"
    >
      <p>Amount:</p>
      <a-slider
        v-model:value="amount"
        :tooltip-open="true"
        :tip-formatter="formatter"
        @change="sliderChange"
        :max="maxSliderValue"
        :step="currentPrice"
      />
      
      <p>Stock:</p>
      <a-input-number
        id="inputNumber"
        v-model:value="stockToBuy"
        :min="1"
        @change="inputChange"
        :max="maxInputValue"
      >
        <template #upIcon>
          <ArrowUpOutlined />
        </template>
        <template #downIcon>
          <ArrowDownOutlined />
        </template>
      </a-input-number>
    </a-modal>
  </div>
</template>

<script>
import StockChart from "@/components/StockChart.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import { stocksArr } from "@/store/stockArr";
import {
  FallOutlined,
  RiseOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "@/store/data-context";
import { apiService } from "@/services/apiService";

export default {
  components: {
    StockChart,
    FallOutlined,
    RiseOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const symbol = ref(route.params.symbol);
    const currentPrice = ref(null);
    const isModalVisible = ref(false);
    const modalTitle = ref("");
    const stockToBuy = ref(0);
    const stockToSell = ref(0);
    const amount = ref(0);
    const selectedOption = ref("");
    const companyInfo = ref(null);
    companyInfo.value = stocksArr.find(
      (stock) => stock.symbol === symbol.value
    );
    const priceChangeClass = companyInfo.value.priceChange.includes("-")
      ? "negative-price"
      : "positive-price";

    const showModal = (action) => {
      selectedOption.value = action === "buy" ? "buy" : "sell";
      isModalVisible.value = true;
      modalTitle.value = (action === "buy" ? "Buy" : "Sell").concat(
        " ",
        symbol.value,
        " Stock"
      );
    };

    const handleModalConfirm = () => {
      isModalVisible.value = false;

      const newStock = {
        symbol: symbol.value,
        amount: stockToBuy.value,
        eachPrice: currentPrice.value,
        type: selectedOption.value,
        companyName: companyInfo.value.CcmpanyName,
        logoUrl: companyInfo.value.logoUrl,
      };
      store.addStock(newStock);

      // Navigate to the "Investment" page
      router.push({ name: "Investment" });
    };
    const formatter = () => {
      return `$${amount.value}`;
    };

    const inputChange = (value) => {

      stockToBuy.value = Number(value);
      let currentAmount = value * currentPrice.value;
      amount.value = currentAmount;
    };

    const sliderChange = (value) => {
      let currentStock = value / currentPrice.value;
      stockToBuy.value = currentStock.toFixed(0);
    };

    const maxSliderValue = computed(() => {
      let price = currentPrice.value;
      return selectedOption.value === "buy"
        ? Math.floor(Number(store.getBalance) / Number(currentPrice.value)) *
            Number(price)
        : Number(price) * Number(stockToSell);
        
    });

    const maxInputValue = computed(() => {
      return selectedOption.value === "buy"
        ? Math.floor(Number(store.getBalance) / Number(currentPrice.value))
        : Number(stockToSell);
    });

    // form child (emit)
    const getPrice = (price) => {
      currentPrice.value = price;
    };

    const hasStock = computed(() => {
      return stockToSell.value > 0;
    });

    const enoughMoney = computed(() => {
      return store.getBalance >= Number(currentPrice.value);
    });

    const getBoughtStocks = () => {
      const boughtStocks = [...store.stocks].filter((stock) => {
        return stock.symbol === symbol.value && stock.type === "buy";
      });
      const soldStocks = [...store.stocks].filter((stock) => {
        return stock.symbol === symbol.value && stock.type === "sell";
      });
      let totalBoughtStocks = 0;
      if (boughtStocks) {
        totalBoughtStocks = boughtStocks.reduce(
          (acc, cur) => acc + Number(cur.amount),
          0
        );
      }
      let totalSoldStocks = 0;
      if (soldStocks) {
        totalSoldStocks = soldStocks.reduce(
          (acc, cur) => acc + Number(cur.amount),
          0
        );
      }
      return Number(totalBoughtStocks - totalSoldStocks).toFixed(0);
    };

    watch(store.stocks, () => {
      stockToSell.value = getBoughtStocks();
    });

    onMounted(async () => {
      try {
        companyInfo.value = await apiService.getStock(symbol.value);
      } catch (error) {
        console.log("Error fetching stocks:", error);
      }
    });

    return {
      store,
      symbol,
      companyInfo,
      priceChangeClass,
      isModalVisible,
      modalTitle,
      showModal,
      handleModalConfirm,
      amount,
      formatter,
      stockToBuy,
      getPrice,
      maxSliderValue,
      maxInputValue,
      inputChange,
      sliderChange,
      currentPrice,
      hasStock,
      enoughMoney,
      getBoughtStocks,
    };
  },
};
</script>

<style scoped>
.stock-detail {
  max-height: 75vh;
  overflow: auto;
}

.logo {
  height: 50px;
  width: 50px;
  max-width: 100px;
  margin-right: 20px;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 20px;
}

.positive-price {
  color: green;
}

.negative-price {
  color: red;
}
</style>
