<template>
  <Frame id="addModal">
    <Page>
      <ActionBar title="Ajouter un son"/>
      <FlexboxLayout class="p-10" justifyContent="space-around" flexDirection="column">
          <GridLayout height="40" rows="*" columns="auto,*">
            <Label row="0" col="0" class="font-weight-bold m-t-10" text="Titre :" />
            <TextField row="0" col="1" v-model="form.title" />
          </GridLayout>
          <GridLayout height="40" class="m-t-30" rows="*" columns="auto,*">
            <Label row="0" col="0" class="font-weight-bold m-t-10" text="URL :" />
            <TextField row="0" col="1" v-model="form.url" />
          </GridLayout>
          <GridLayout height="180" rows="*,*,*" columns="auto,*">
            <Label row="1" col="0" height="60" class="m-r-15 p-y-20 font-weight-bold" text="Catégorie :" />
            <ListPicker row="0" col="1" rowSpan="3" :items="categoryList" v-model="form.category" />
          </GridLayout>
          <GridLayout height="60" rows="auto" columns="*, *">
            <Button class="btn" text="Ajouter" @tap="$modal.close(form)" row="0" col="0" />
            <Button class="btn" text="Fermer" @tap="$modal.close" row="0" col="1" />
          </GridLayout>
      </FlexboxLayout>
    </Page>
  </Frame>
</template>
<script>
export default {
  name: 'AddSound',
  data() {
    return {
      categoryList: [
        'GJ',
        'NOOB',
        'TG',
        'Autre'
      ],
      form: {
        title: '',
        url: '',
        category: 0
      }
    }
  }
};
</script>
<style scoped>
  TextField, label {
    font-size: 15;
  }
</style>