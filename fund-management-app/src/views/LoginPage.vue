<template>
  <div
    :style="{
      width: '100%',
      height: '100vh',
      backgroundColor: '#0093E9',
      backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
  >
    <div>
      <LayoutLogo :style="{ marginBottom: '20px' }" />
      <a-card :style="{ minWidth: '260px', width: '368px', margin: '0 auto' }">
        <a-form
          id="formLogin"
          :model="formState"
          ref="formLogin"
          @submit="handleSubmit"
          style="margin-top: 15px"
        >
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input
              size="large"
              type="text"
              placeholder="Username"
              v-model:value="formState.username"
            >
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>

          <!-- <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password
              size="large"
              placeholder="Password"
              v-model:value="formState.password"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input-password>
          </a-form-item> -->

          <a-form-item
            name="balance"
            :rules="[{ required: true, message: 'Please input any deposit!' }]"
          >
            <a-input-number
              size="large"
              placeholder="Deposit"
              v-model:value="formState.balance"
              :min="100"
              :max="1000000"
              prefix="$"
              :style="{ width: '100%' }"
            />
          </a-form-item>
          <!-- 
          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox> Remember me </a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
          </a-form-item> -->

          <a-form-item style="margin-top: 24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              :disabled="disabled"
              class="login-form-button"
              style="width: '100%'"
            >
              Start
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import LayoutLogo from "@/components/LayoutLogo.vue";
import { useStore } from "@/store/data-context";
import { useRouter } from "vue-router";

export default {
  components: { UserOutlined, LayoutLogo },
  setup() {
    const router = useRouter();
    const store = useStore();
    // const formState = reactive({ username: "", password: "" });
    const formState = reactive({ username: "", balance: 0 });
    const handleSubmit = (values) => {
      store.login({ username: formState.username, balance: formState.balance });
      router.push({ name: "Overview" });
    };
    // const disabled = computed(() => {
    //   return !(formState.username && formState.password);
    // });
    const disabled = computed(() => {
      return !(formState.username && formState.balance);
    });
    return { formState, handleSubmit, disabled };
  },
};
</script>

<style scoped>
.login-form-button {
  width: 100%;
}
</style>
