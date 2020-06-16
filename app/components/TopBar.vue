<template>
  <ActionBar 
      title="Papagei" 
      android:flat="true"
    >
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
        text="Changer le channel"
        android.position="popup"
      />
    </ActionBar>
</template>
<script>
import axios from 'axios';
import Sqlite from 'nativescript-sqlite';
import * as Toast from 'nativescript-toast';
export default {
  data() {
    return {
      db: {},
      channel: ''
    }
  },
  async mounted() {
		try {
			const db = await new Sqlite('papagei.sqlite');
			if (db.isOpen()) {
				this.db = db;
				try {
          const ver = await this.db.version();
					if (ver <= 1) {
						this.db.execSQL('CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)');
						this.db.execSQL('INSERT INTO Settings (json) VALUES (?)', [JSON.stringify({channeId: ''})])
						this.db.version(ver + 1); // Sets the version to 2
					}
				} catch (err) {
					alert(err);
				}
			}else{
				alert('BD deconnecté');
			}
		} catch (err) {
			alert('Création de la BD: '+err);
		};
	},
  methods: {
    async connectBot() {
      try {
        await this.getSettings();
				const response = await axios.get(`http://url/connect/${this.channel}`);
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
      prompt('Saisir l\'id du channel discord')
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
    }
  }
}
</script>
<style scoped>
  ActionBar {
    background-color: #e74c3c;
    color: #ffffff;
  }
</style>