<template>
  <ActionBar 
      title="Papagei" 
      android:flat="true"
    >
      <ActionItem 
        @tap="showModal()"
        ios.systemIcon="16" 
        ios.position="right"
        text="Ajouter un son"
        android.position="popup"
      />
      <ActionItem 
        @tap="connectBot()"
        ios.systemIcon="16" 
        ios.position="right"
        text="Connecter le bot"
        android.position="popup"
      />
      <ActionItem 
        @tap="newSettings()"
        ios.systemIcon="16" 
        ios.position="right"
        text="Modifier le channel"
        android.position="popup"
      />
    </ActionBar>
</template>
<script>
import AddSound from './AddSound.vue';
import axios from 'axios';
import * as Toast from 'nativescript-toast';
import configs from '../configs.json';

export default {
  name: 'TopBar',
  props: {
		db: Object
	},
  data() {
    return {
      channel: ''
    }
  },
  methods: {
    showModal() {
      this.$showModal(AddSound)
      .then(data => {
        this.onSave(data);
      });
    },
    async connectBot() {
      try {
        await this.getSettings();
				const response = await axios.get(`${configs.server}/connect/${this.channel}`);
				const toast = Toast.makeText("Connexion");
				toast.show();
			} catch (err) {
				alert(err.message);
			}
    },
    async getSettings() {
      this.db.get('SELECT * FROM Settings WHERE id = ?', [1])
      .then(result => {
        this.channel = JSON.parse(result[1]).channel;
			});
    },
    newSettings() {
      prompt({
        title: 'Modifier le channel',
        message: 'Saisir l\'id du nouveau channel Discord',
        okButtonText: "Sauvegarder",
        cancelButtonText: "Annuler",
      })
      .then(result => {
        if(result.result){
          this.db.execSQL('UPDATE Settings SET json = ? WHERE id = 1', [JSON.stringify({
            channel: result.text
          })])
          .then(id => {
            const toast = Toast.makeText('le channel a été modifié');
            toast.show();
          });
        }
      });
    },
    onSave(form) {
			if(form.url.includes('?v=')){
				form.url = form.url.split('?v=')[1];
			}else if(form.url.includes('.be/')){
				form.url = form.url.split('.be/')[1];
			}
      form.pic = `https://i.ytimg.com/vi/${form.url}/hqdefault.jpg`;
      this.db.execSQL('INSERT INTO Sounds (json) VALUES (?)', [JSON.stringify(form)])
			.then(id => {
				const toast = Toast.makeText("Le son a été ajouté");
        toast.show();
        this.$emit('newSound');
			});
    }
  },
  components: {
    AddSound
  }
}
</script>
<style scoped>
  ActionBar {
    background-color: #e74c3c;
    color: #ffffff;
  }
</style>