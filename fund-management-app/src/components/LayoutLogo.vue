<template>
  <div class="logo-container">
    <FundOutlined class="logo-icon" />
    <span class="logo-text">FUNDAPP</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { FundOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    FundOutlined,
  },
  computed: {},
});
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  color: white;
}

.logo-icon {
  color: white;
  font-size: 24px;
  margin-right: 8px;
}

.logo-text {
  color: white;
  font-size: 20px;
}
</style>
