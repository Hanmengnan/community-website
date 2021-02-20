<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="(item, index) in listItems"
        :key="index"
        v-on:click="operate(item.link, item.func)"
      >
        <v-list-item-icon>
          <v-badge color="pink" dot :value="item.alarm">
            <v-icon>{{ "mdi-" + item.icon }}</v-icon>
          </v-badge>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "List",
  props: {
    listItems: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    toHref: function(link) {
      this.$router.push({ path: link });
    },
    operate: function(link, func) {
      if (link !== undefined) {
        this.toHref(link);
      } else {
        func();
      }
    }
  }
};
</script>

<style scoped></style>
