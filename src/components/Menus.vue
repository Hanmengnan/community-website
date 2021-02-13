<template>
  <div class="text-center">
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar size="30" fab plain v-bind="attrs" v-on="on">
          <slot name="avatar-content"> </slot>
        </v-avatar>
      </template>
      <v-card>
        <slot name="menus-content"></slot>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Menus"
};
</script>

<style lang="less" scoped></style>
