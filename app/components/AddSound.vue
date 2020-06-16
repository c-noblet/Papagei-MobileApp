<template>
  <GridLayout rows="auto, *" columns="*">
    <StackLayout row="0" col="0">
      <StackLayout>
        <Label text="Titre" />
        <TextField v-model="form.title" />
      </StackLayout>
      <StackLayout>
        <Label text="URL" />
        <TextField v-model="form.url" />
      </StackLayout>
      <StackLayout>
        <Label text="Catégorie" />
        <ListPicker :items="categoryList" v-model="form.category" />
      </StackLayout>
      <GridLayout rows="auto, auto" columns="*, *">
        <Button text="Save" @tap="onSave(form)" row="0" col="0" />
        <Button text="Clear" @tap="onClear()" row="0" col="1" />
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>
<script>
export default {
  props: {
    onSave: Function
  },
  data() {
    return {
      categoryList: [
        'Gj',
        'Noob',
        'Tg',
        'Wtf',
        'Autres'
      ],
      form: {
        title: '',
        url: '',
        category: 0
      }
    }
  },
  methods: {
    onClear() {
      this.form = {
        title: '',
        url: '',
        category: 0
      }
    }
  },
};
</script>