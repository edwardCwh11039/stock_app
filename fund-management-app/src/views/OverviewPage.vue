<template>
  <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" class="overview-row">
    <a-col :lg="{ span: 12 }" :xs="{ span: 24 }">
      <TrendingStock />
    </a-col>
    <a-col :lg="{ span: 12 }" :xs="{ span: 24 }">
      <BreakingNews />
    </a-col>
  </a-row>
</template>
<script>
import alphaApi from "@/services/alphaAPI";
import TrendingStock from "@/components/TrendingStock.vue";
import BreakingNews from "@/components/BreakingNews.vue";

export default {
  components: {
    TrendingStock,
    BreakingNews,
  },
  setup() {
    const topGainersLosers = async () => {
      try {
        let res = await alphaApi.topGainersLosers();
        console.log(res);
      } catch (error) {
        console.error("Error fetching daily stock data:", error);
      }
    };
    // topGainersLosers();
  },
};
</script>
