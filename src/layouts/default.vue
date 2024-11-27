<template>
  <div>
    <app-header></app-header>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/header/AppHeader.vue";
</script>