<template>
  <v-pagination v-model="page" :length="6"></v-pagination>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: 1
    };
  }
};
</script>

<style scoped></style>
