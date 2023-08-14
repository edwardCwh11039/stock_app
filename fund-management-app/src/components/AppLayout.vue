<template>
  <a-layout style="height: 100vh">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <LayoutLogo />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        style="text-align: center"
      >
        <a-menu-item
          v-for="route in routes"
          :key="route.path"
          @click="navigate(route.name)"
        >
          <span style="font-size: 18px; text-transform: capitalize">
            {{ route.meta.name }}
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        :style="{
          background: '#fff',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <a-input-search
          placeholder="Search by name"
          v-model:value="searchString"
          @search="onSearch"
          size="large"
          :style="{ width: '200px' }"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '20px' }">
        <div class="layout-content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent, ref, h, watch, onMounted } from "vue";
import LayoutLogo from "./LayoutLogo.vue";
import { apiService } from "@/services/apiService";

export default defineComponent({
  components: {
    LayoutLogo,
  },
  setup() {
    const router = useRouter();
    const routes = router.options.routes.filter((route) => route.meta);
    const selectedKeys = ref([]);
    const searchString = ref("");

    const navigate = (routeName) => {
      router.push({ name: routeName });
    };

    const onSearch = async (text) => {
      console.log(text);
      searchString.value = text;
      if (text.length > 1) {
        await apiService.searchStock(text).then((res) => console.log(res));
      }
    };

    const renderIcon = (iconType) => {
      return h(iconType);
    };

    // Watch for route changes and update selectedKeys
    const updateSelectedKeys = () => {
      selectedKeys.value = routes
        .filter((route) => route.path === router.currentRoute.value.path)
        .map((route) => route.path);
    };

    // Listen to route changes
    watch(
      () => router.currentRoute.value,
      () => {
        updateSelectedKeys();
      }
    );

    // Initial selection based on the current route
    onMounted(() => {
      updateSelectedKeys();
    });

    return {
      routes: routes,
      selectedKeys,
      navigate,
      searchString,
      onSearch,
      renderIcon,
    };
  },
});
</script>
<style>
.layout-content {
  max-height: calc(100vh - 20px);
  padding: "20px";
  background: "#fff";
  min-height: "360px";
}
</style>
