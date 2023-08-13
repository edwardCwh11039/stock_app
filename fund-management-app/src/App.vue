<template>
  <div style="height: 100vh">
    <app-layout>
      <router-view />
      <!-- This is where the routed content will be displayed -->
    </app-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AppLayout from "./components/AppLayout.vue"; // Adjust the path accordingly
import router from "./router";

export default defineComponent({
  components: {
    AppLayout,
  },
  router,
});
</script>

<style>
/* Your global styles here */
</style>
