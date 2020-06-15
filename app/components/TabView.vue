<template>
  <TabView android:tabBackgroundColor="#53ba82"
			android:tabTextColor="#c4ffdf"
			android:selectedTabTextColor="#ffffff"
			androidSelectedTabHighlightColor="#ffffff">
			<TabViewItem title="All">
				<ListView for="sound in sounds">
					<v-template>
						<GridLayout columns="*, auto" rows="auto, auto">
							<!--<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.id)" />-->
							<Label :text="sound.title" row="0" col="0" @tap="onPlay(sound.id)"/>
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
				alert('db not connnected');
			}
		} catch (err) {
			alert('db init: '+err);
		};
	},
	methods: {
    onplay(id) {
      alert('test '+ id);
    },
    onDelete(id) {
			alert('test '+ id);
		},
		onSave(form) {
			this.db.execSQL('INSERT INTO Sounds (json) VALUES (?)', [JSON.stringify(form)]).then(id => {
				alert('insert id: '+id);
				this.getSounds();
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