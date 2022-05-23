<template>
  <div></div>
</template>

<script>
import { ACCESS_TOKEN } from '@/store/mutation-types';
import storage from 'store';
import { loginByAuthorizationCode } from '@/api/auth';

export default {
  created() {
    console.log('客户端授权码登录');
     if (this.$route.query.code) {
      this.loading = true;
      loginByAuthorizationCode(this.$route.query.code)
        .then(result => {
          storage.set(ACCESS_TOKEN, result.access_token, 7 * 24 * 60 * 60 * 1000);
          this.$router.push({ path: storage.get('redirectUrl') || '/' });
        })
        .catch(() => {
          this.$router.push({ path: '/user/login' });
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>

</style>
