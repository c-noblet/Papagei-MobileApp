<template>
  <TabView 
			@selectedIndexChange="getSounds()"
			android:tabBackgroundColor="#53ba82"
			android:tabTextColor="#c4ffdf"
			android:selectedTabTextColor="#ffffff"
			androidSelectedTabHighlightColor="#ffffff">
			<TabViewItem title="[+]">
				<add-sound :onSave="onSave" />
			</TabViewItem>
			<TabViewItem title="Tous">
				<ListView for="sound in sounds">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Gj">
				<ListView for="sound in sounds.filter(sound => sound.category == 0)">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Noob">
				<ListView for="sound in sounds.filter(sound => sound.category == 1)">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Tg">
				<ListView for="sound in sounds.filter(sound => sound.category == 2)">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Wtf">
				<ListView for="sound in sounds.filter(sound => sound.category == 3)">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
			</TabViewItem>
			<TabViewItem title="Autres">
				<ListView for="sound in sounds.filter(sound => sound.category == 4)">
					<v-template>
						<GridLayout columns="80, *, auto" rows="auto">
							<Image :src="sound.pic" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
							<Label :text="sound.title" row="0" col="1" @tap="onPlay(sound.url)"/>
							<Button text="Supprimer" row="0" col="2" @tap="onDelete(sound.id)"/>
						</GridLayout>
					</v-template>
				</ListView>
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
					alert('sounds: '+ ver);
					if (ver <= 1) {
						this.db.execSQL('CREATE TABLE IF NOT EXISTS Sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, json TEXT)');
						this.db.version(ver + 1); // Sets the version to 1
					}
					this.getSounds();
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