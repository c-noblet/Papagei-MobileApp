<template>
  <TabView android:tabBackgroundColor="#53ba82"
			android:tabTextColor="#c4ffdf"
			android:selectedTabTextColor="#ffffff"
			androidSelectedTabHighlightColor="#ffffff">
			<TabViewItem title="All">
				<ListView for="sound in sounds">
					<v-template>
						<GridLayout columns="*, auto" rows="auto, auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="1" col="0" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="1" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Add">
				<add-sound :onSave="onSave" />
			</TabViewItem>
		</TabView>
</template>
<script>
import AddSound from './AddSound.vue';
import axios from 'axios';
import * as Toast from 'nativescript-toast';
import Sqlite from 'nativescript-sqlite';
export default {
	data() {
		return {
			db: {},
			sounds: []
		}
	},
	async mounted() {
		try {
			const db = await new Sqlite('papagei.sqlite');
			if (db.isOpen()) {
				this.db = db;
				try {
					const ver = await this.db.version();
					if (ver === 0) {
						this.db.execSQL('CREATE TABLE IF NOT EXISTS Sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)');
						this.db.version(1); // Sets the version to 1
					}
					await this.getSounds();
				} catch (err) {
					alert(err);
				}
			}else{
				alert('BD deconnecté');
			}
		} catch (err) {
			alert('Création de la BD'+err);
		};
	},
	methods: {
    async onPlay(ytId) {
			try {
				const response = await axios.get('http://192.168.1.94:8000/sounds/'+ytId);
				const toast = Toast.makeText("Lecture");
				toast.show();
			} catch (err) {
				alert(err.message);
			}
			
    },
    onDelete(id) {
			this.db.execSQL('DELETE FROM Sounds WHERE id=?', [id])
			.then(() => {
				this.getSounds();
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
				this.getSounds();
				const toast = Toast.makeText("Le son a été ajouté");
				toast.show();
			});
		},
		getSounds() {
			this.db.all('SELECT * FROM Sounds').then(result => {
				this.sounds = [];
				for (let i = 0; i < result.length; i++) {
					this.sounds.push(JSON.parse(result[i][1]));
					this.sounds[i].id = result[i][0];
				}
			});
		}
	},
	components: {
		AddSound
	}
}
</script>