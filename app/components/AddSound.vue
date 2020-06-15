<template>
  <GridLayout rows="auto, *" columns="*">
    <StackLayout class="form" row="0" col="0">
      <StackLayout class="input-field">
        <Label text="Titre" class="label font-weight-bold" />
        <TextField class="input" v-model="form.title" />
      </StackLayout>
      <StackLayout class="input-field">
        <Label text="URL" class="label font-weight-bold" />
        <TextField class="input" v-model="form.url" />
      </StackLayout>
      <StackLayout class="input-field">
        <Label text="Catégorie" class="label font-weight-bold" />
        <ListPicker :items="categoryList" v-model="form.category" />
      </StackLayout>
      <StackLayout class="input-field">
        <Label text="Favoris" class="label font-weight-bold m-b-5" />
        <Switch v-model="form.favorite" />
      </StackLayout>
      <GridLayout rows="auto, auto" columns="*, *">
        <Button text="Save" @tap="onSave(form)" class="btn btn-primary" row="0" col="0" />
        <Button text="Clear" @tap="onClear()" class="btn btn-primary" row="0" col="1" />
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
        'Bien joué',
        'T\'es nul',
        'Ta geule',
        'wtf',
        'autres'
      ],
      form: {
        title: '',
        url: '',
        favorite: false,
        category: 0
      }
    }
  },
  methods: {
    onClear() {
      this.form = {
        title: '',
        url: '',
        favorite: false,
        category: 0
      }
    }
  },
};
</script>