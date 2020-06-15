<template>
  <Page>
    <top-bar />
    <tab-view />
  </Page>
</template>

<script>
import TopBar from './TopBar.vue';
import TabView from './TabView.vue';

export default {
  components: {
    TabView, TopBar
  }
}
</script>
