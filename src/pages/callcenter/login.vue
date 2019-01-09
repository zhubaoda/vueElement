<template>
  <div>
    <button @click="loginIt">登录啊啊</button>
  </div>
</template>

<script>
import interfaces from "../../interfaces/index";
export default {
  data() {
    return {
      formData: {
        loginName: "loongair",
        Password: "Loongair123"
      }
    };
  },
  methods: {
    async loginIt() {
      let res = await interfaces.loginCenter(this.formData);
    }
  },
  created() {

  }
};
</script>

<style>
</style>