<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="6"></v-pagination>
  </div>
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
