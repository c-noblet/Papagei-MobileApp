<template>
  <ActionBar 
      title="Papagei" 
      android:flat="true"
    >
      <ActionItem 
        @tap="connectBot()"
        ios.systemIcon="16" 
        ios.position="right"
        text="Connect Bot"
        android.position="popup"
      />
    </ActionBar>
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    connectBot(){
      alert('test');
    }
  }
}
</script>
<style scoped>
  ActionBar {
    background-color: #27ae60;
    color: #ffffff;
  }
</style>