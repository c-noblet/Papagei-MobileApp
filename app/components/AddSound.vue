<template>
    <Page class="page">
      <ActionBar class="action-bar" title="Sound"></ActionBar>
      <GridLayout rows="auto, *" columns="*">
        <StackLayout class="form" row="0" col="0">
          <StackLayout class="input-field">
            <Label text="Titre" class="label font-weight-bold m-b-5" />
            <TextField class="input" v-model="input.title" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout class="input-field">
            <Label text="URL" class="label font-weight-bold m-b-5" />
            <TextField class="input" v-model="input.url" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout class="input-field">
            <Label text="Catégorie" class="label font-weight-bold m-b-5" />
            <ListPicker :items="categoryList" v-model="input.category" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <StackLayout class="input-field">
            <Label text="Favoris" class="label font-weight-bold m-b-5" />
            <Switch v-model="input.favorite" />
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>
          <GridLayout rows="auto, auto" columns="*, *">
            <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
            <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1"  />
            <Button text="Clear" @tap="clear" class="btn btn-primary" row="1" col="0" colSpan="2"  />
          </GridLayout>
        </StackLayout>
      </GridLayout>
    </Page>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [
        'Bien joué',
        'T\'es nul',
        'Ta geule',
        'wtf',
        'autres'
      ],
      input: {
        title: '',
        url: '',
        favorite: false,
        category: ''
      }
    }
  },
  methods: {
    save() {
      this.$store.dispatch('insert', this.input);
    },
    load() {
      this.$store.dispatch('query');
    },
    clear() {
      this.input.title = '';
      this.input.url = '';
      this.input.pic = '';
      this.input.favorite = '';
      this.input.category = '';
    }
  }
};
</script>