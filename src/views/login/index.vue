<template>
  <div class="bg-no-repeat bg-contain bg-center flex h-screen login-bg justify-center items-center">
    <div class="h-96 w-96">
      <div class="flex mb-2 text-3xl justify-center">
        <div class="bg-clip-text title">Decord</div>
      </div>
      <div class="flex text-sm mb-20 text-gray-500 justify-center">欢迎 welcome</div>
      <n-form label-placement="left" :model="form" ref="formRef" :rules="rules">
        <n-form-item path="username">
          <n-input
            size="large"
            v-model:value="form.username"
            type="text"
            placeholder="请输入用户名"
            clearable
          >
            <template #prefix>
              <n-icon>
                <PersonOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            size="large"
            v-model:value="form.password"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
          >
            <template #prefix>
              <n-icon>
                <LockClosedOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button
            class="w-full"
            type="primary"
            :loading="loadingLogin"
            size="large"
            @click="login"
            >登录</n-button
          >
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { $sleep } from '@/utils/util';
  import { useMessage } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
  import { useFormValidate } from '@/hooks/useFormValidate';
  import { useCookie } from '@hooks/useCookie';
  import { AuthEunm } from '@/enums/http';

  const formRef = ref(null);
  const loadingLogin = ref(false);
  const message = useMessage();
  const $router = useRouter();

  const cookies = useCookie();

  const rules = {
    username: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  };

  const form = reactive({
    username: 'admin',
    password: '123456',
  });

  const login = async () => {
    const validate = await useFormValidate(formRef);
    if (!validate) return;
    loadingLogin.value = true;
    await $sleep();
    cookies.set(AuthEunm.TOKEN, 'askjfhaskjhfqwr1246astg1fa6');
    loadingLogin.value = false;
    message.success('登录成功');
    $router.push('/');
  };
</script>

<style lang="scss" scoped>
  .login-bg {
    background-image: url('@/assets/loginBg.svg');
  }

  .title {
    color: #0000;
    background-image: linear-gradient(252deg, rgba(24, 160, 88, 0.6) 0%, #18a058 100%);
    font-weight: 500;
  }
</style>
