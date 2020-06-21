<template>
  <Page>
    <top-bar 
			:db="db" 
			@newSound="getSounds"
		/>
		<tab-view
			:db="db"
			:sounds="sounds"
			@deletedSound="getSounds"
		/>
  </Page>
</template>

<script>
import TopBar from './TopBar.vue';
import TabView from './TabView.vue';
import Sqlite from 'nativescript-sqlite';

export default {
	name: 'App',
  data() {
		return {
			db: {},
			sounds: []
		}
  },
  async mounted() {
		this.db = await Sqlite('papagei.sqlite');
		try {
			if (this.db.isOpen()) {
				try {
					const ver = await this.db.version();
					if (ver === 0) {
						await this.db.execSQL('CREATE TABLE IF NOT EXISTS Sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)');
            await this.db.execSQL('CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)');
						await this.db.execSQL('INSERT INTO Settings (json) VALUES (?)', [JSON.stringify({channeId: ''})])
						this.db.version(1); // Sets the version to 1
					} else {
						await this.getSounds();
					}
				} catch (err) {
					alert(`error: ${err}`);
				}
			}else{
				alert('BD deconnecté');
			}
		} catch (err) {
			alert(`Création de la BD: ${err}`);
		};
	},
	methods: {
		async getSounds() {
			this.db.all('SELECT * FROM Sounds').then(result => {
				const sounds = [];
				for (let i = 0; i < result.length; i++) {
					sounds.push(JSON.parse(result[i][1]));
					sounds[i].id = result[i][0];
				}
				this.sounds = sounds;
			});
		}
	},
  components: {
    TopBar, TabView
  }
}
</script>
