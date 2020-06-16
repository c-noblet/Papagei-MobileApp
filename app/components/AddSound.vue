<template>
  <GridLayout rows="auto, *" columns="*">
    <StackLayout class="nt-form" row="0" col="0">
      <GridLayout class="m-l-10 m-t-30" rows="*" columns="auto,*">
        <Label row="0" col="0" class="font-weight-bold p-t-15" text="Titre :" />
        <TextField row="0" col="1" v-model="form.title" />
      </GridLayout>
      <GridLayout class="m-l-10 m-t-30" rows="*" columns="auto,*">
        <Label row="0" col="0" class="font-weight-bold p-t-15" text="URL :" />
        <TextField row="0" col="1" v-model="form.url" />
      </GridLayout>
      <GridLayout class="m-l-10 m-t-30" rows="*,*,*" columns="auto,*">
        <Label row="1" col="0" class="m-r-15 font-weight-bold" text="Catégorie :" />
        <ListPicker row="0" col="1" rowSpan="2" :items="categoryList" v-model="form.category" />
      </GridLayout>
      <GridLayout class="m-t-30" rows="auto, auto" columns="*, *">
        <Button class="" text="Ajouter" @tap="onSave(form)" row="0" col="0" />
        <Button class="" text="Effacer" @tap="onClear()" row="0" col="1" />
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