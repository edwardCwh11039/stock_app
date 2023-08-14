<template>
  <div style="height: 100vh">
    <div v-if="store.userName === ''"><LoginPage /></div>
    <div v-else>
      <app-layout>
        <router-view />
      </app-layout>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import router from "./router";
import AppLayout from "./components/AppLayout.vue";
import LoginPage from "./views/LoginPage.vue";
import { useStore } from "@/store/data-context";

export default defineComponent({
  components: {
    AppLayout,
    LoginPage,
  },
  router,
  data() {
    return {
      store: useStore(),
    };
  },
});
</script>

<style>
/* Your global styles here */
</style>
