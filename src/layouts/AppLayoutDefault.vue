<template>
  <v-app>
    <v-main>
      <v-container class="main-container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" lg="6">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style lang="scss">
.main-container {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
