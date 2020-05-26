<template>
  <Page>
    <ActionBar 
      title="Papagei" 
      android:flat="true"
    >
      <ActionItem 
        @tap="addSound"
        ios.systemIcon="16" 
        ios.position="right"
        text="Add a sound" 
        android.position="popup"
      />
      <ActionItem 
        @tap="getSounds"
        ios.systemIcon="16" 
        ios.position="right"
        text="Reload sounds" 
        android.position="popup"
      />
      <ActionItem 
        @tap="setServer"
        ios.systemIcon="16" 
        ios.position="right"
        text="Set server IP" 
        android.position="popup"
      />
    </ActionBar>
    <ListView for="sound in sounds">
      <v-template>
        <GridLayout columns="*, auto" rows="auto, auto">
          <Label :text="sound.title" row="0" col="0" @tap="onTap(sound._id)"/>
          <Button text="Supprimer" row="0" col="1" @tap="onDelete(sound._id)"/>
        </GridLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import axios from 'axios';
export default {
  mounted() {
    this.getSounds();
  },
  data() {
    return {
      host: "http://192.168.1.24:8000/sounds/",
      sounds: []
    }
  },
  methods: {
    async setServer() {
      const hostPrompt = await prompt({
        title: "Adresse IP",
        message: "Insérer l'adresse IP ci-dessous",
        cancelButtonText: "Annuler  ",
        okButtonText: "  Ajouter"
      });
      if(hostPrompt.text.trim() !== '' && hostPrompt.result){
        this.host = `http://${hostPrompt.text}:8000/sounds/`;
      }
      alert(`Server set to : ${this.host}`);
    },
    async getSounds() {
      try {
        const response = await axios.get(this.host);
        this.sounds = await response.data;
      } catch (err) {
        alert(await err.message);
      }
    },
    async addSound() {
      const urlPrompt = await prompt({
        title: "Ajoutez un son YouTube",
        message: "Copier l'URL ci-dessous",
        cancelButtonText: "Annuler  ",
        okButtonText: "  Ajouter"
      });

      if(urlPrompt.text.trim() !== '' && urlPrompt.result){
        const url = urlPrompt.text;
        const titlePrompt = await prompt({
          title: "Ajoutez un son YouTube",
          message: "Saisissez le nom ci-dessous",
          cancelButtonText: "Annuler  ",
          okButtonText: "  Sauvegarder"
        });

        if(titlePrompt.text.trim() !== '' && titlePrompt.result){
          const title = titlePrompt.text;
          const formData = {
            "title": title,
            "url": url
          };
          try {
            const response = await axios.post(this.host, formData);
            alert(await response.data).then(()=>{
              this.getSounds();
            });
          } catch (err) {
            alert(await err.message);
          }
        }
      }
    },
    async onTap (id) {
      try {
        const response = await axios.get(this.host+id);
        alert(await response.data.title);
      } catch (err) {
        alert(`Could not play the sound because of : ${ await err.message}`);
      };
    },
    async onDelete (id) {
      const deletePrompt = await confirm('Voulez vous supprimez le son ?');
      if(deletePrompt){
        try {
          const response = await axios.delete(this.host+id);
          alert(await response.data.message).then(() => {
            this.getSounds();
          });
        } catch (err) {
          alert(await err.message);
        }
      }
    }
  }
}
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
