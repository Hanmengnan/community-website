<template>
  <v-text-field
    class="input-item"
    v-model="value"
    :type="title.indexOf('Password') !== -1 ? 'password' : 'text'"
    :label="title"
    :append-icon="'mdi-' + icon"
    :rounded="rounded"
    :hide-details="hideDetails"
    :solo="solo"
    :dense="dense"
  ></v-text-field>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    hideDetails: {
      type: Boolean,
      required: false
    },
    rounded: {
      type: Boolean,
      required: false
    },
    solo: {
      type: Boolean,
      required: false
    },
    dense: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      value: ""
    };
  },

  mounted() {},

  watch: {
    value: function(newVal) {
      this.$emit("change", newVal);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";
.input-item {
  width: 100%;
}
</style>
