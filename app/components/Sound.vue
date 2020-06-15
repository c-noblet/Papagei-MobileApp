<template>
  <GridLayout columns="*, auto" rows="auto, auto">
    <Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound._id)" />
    <!--<Label :text="sound.title" row="0" col="0" @tap="onPlay(sound._id)"/>-->
    <Button text="Supprimer" row="0" col="1" @tap="onDelete(sound._id)"/>
  </GridLayout>
</template>

<script>
export default { 
  props() {
    sound: Object
  }
}
</script>