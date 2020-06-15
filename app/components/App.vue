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
    </ActionBar>
    <StackLayout>
      <ListView for="sound in $store.state.data">
        <v-template>
          <Sound :sound="sound" />
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
import Sound from './Sound';
import axios from 'axios';
import { Feedback, FeedbackPosition } from 'nativescript-feedback';

const toast = new Feedback();

export default {
  mounted() {
    this.getSounds();
  },
  data() {
    return {
      host: "http://192.168.1.94:8000/sounds/",
      sounds: []
    }
  },
  methods: {
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
    async onPlay(id) {
      try {
        const response = await axios.get(this.host+id);
        toast.show({
          message: "test"
          //message: `Playing sound : ${ await response.data.title}`
        });
      } catch (err) {
        alert(`Could not play the sound because of : ${ await err.message}`);
      };
    },
    async onDelete(id) {
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
  },
  components: {
    Sound
  }
}
</script>

<style scoped>
  ActionBar {
    background-color: #27ae60;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
