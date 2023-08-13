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
          placeholder="Search Stock"
          v-model="searchQuery"
          @search="handleSearch"
          size="large"
          :style="{ width: '200px' }"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '20px' }">
        <div
          :style="{ padding: '20px', background: '#fff', minHeight: '360px' }"
        >
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

export default defineComponent({
  components: {
    LayoutLogo,
  },
  setup() {
    const router = useRouter();
    const routes = router.options.routes.filter((route) => route.meta);
    const searchQuery = ref("");
    const selectedKeys = ref([]);

    const navigate = (routeName) => {
      router.push({ name: routeName });
    };

    const handleSearch = () => {
      // Perform search logic based on the searchQuery value
      console.log("Search query:", searchQuery.value);
    };

    const renderIcon = (iconType) => {
      console.log(h(iconType));
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
      searchQuery,
      handleSearch,
      renderIcon,
    };
  },
});
</script>
