<template>
	<Tabs>
		<TabStrip>
			<TabStripItem>
				<Label text="TOUS"></Label>
			</TabStripItem>
			<TabStripItem>
				<Label text="GJ"></Label>
			</TabStripItem>
			<TabStripItem>
				<Label text="NOOB"></Label>
			</TabStripItem>
			<TabStripItem>
				<Label text="TG"></Label>
			</TabStripItem>
			<TabStripItem>
				<Label text="AUTRE"></Label>
			</TabStripItem>
		</TabStrip>

		<TabContentItem>
			<ListView for="sound in sounds">
				<v-template>
					<GridLayout columns="80, *, 110" rows="auto">
						<Image :src="sound.pic" class="img-rounded" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
						<Label :text="sound.title" class="m-l-5" row="0" col="1" @tap="onPlay(sound.url)"/>
						<Button text="Supprimer" class="p-x-5" row="0" col="2" @tap="onDelete(sound.id)"/>
					</GridLayout>
				</v-template>
			</ListView>
		</TabContentItem>

		<TabContentItem>
			<ListView for="sound in sounds.filter(sound => sound.category == 0)">
				<v-template>
					<GridLayout columns="80, *, 110" rows="auto">
						<Image :src="sound.pic" class="img-rounded" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
						<Label :text="sound.title" class="m-l-5" row="0" col="1" @tap="onPlay(sound.url)"/>
						<Button text="Supprimer" class="p-x-5" row="0" col="2" @tap="onDelete(sound.id)"/>
					</GridLayout>
				</v-template>
			</ListView>
		</TabContentItem>

		<TabContentItem>
			<ListView for="sound in sounds.filter(sound => sound.category == 1)">
				<v-template>
					<GridLayout columns="80, *, 110" rows="auto">
						<Image :src="sound.pic" class="img-rounded" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
						<Label :text="sound.title" class="m-l-5" row="0" col="1" @tap="onPlay(sound.url)"/>
						<Button text="Supprimer" class="p-x-5" row="0" col="2" @tap="onDelete(sound.id)"/>
					</GridLayout>
				</v-template>
			</ListView>
		</TabContentItem>

		<TabContentItem>
			<ListView for="sound in sounds.filter(sound => sound.category == 2)">
				<v-template>
					<GridLayout columns="80, *, 110" rows="auto">
						<Image :src="sound.pic" class="img-rounded" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
						<Label :text="sound.title" class="m-l-5" row="0" col="1" @tap="onPlay(sound.url)"/>
						<Button text="Supprimer" class="p-x-5" row="0" col="2" @tap="onDelete(sound.id)"/>
					</GridLayout>
				</v-template>
			</ListView>
		</TabContentItem>

		<TabContentItem>
			<ListView for="sound in sounds.filter(sound => sound.category == 3 || sound.category == 4)">
				<v-template>
					<GridLayout columns="80, *, 110" rows="auto">
						<Image :src="sound.pic" class="img-rounded" row="0" col="0" stretch="fill" @tap="onPlay(sound.url)" />
						<Label :text="sound.title" class="m-l-5" row="0" col="1" @tap="onPlay(sound.url)"/>
						<Button text="Supprimer" class="p-x-5" row="0" col="2" @tap="onDelete(sound.id)"/>
					</GridLayout>
				</v-template>
			</ListView>
		</TabContentItem>
	</Tabs>
</template>
<script>
import axios from 'axios';
import * as Toast from 'nativescript-toast';
import * as configs from '../configs.json';

export default {
	name: 'TabView',
	props: {
		db: Object,
		sounds: Array
	},
	methods: {
    async onPlay(ytId) {
			try {
				const response = await axios.get(`${configs.server}/sounds/${ytId}`);
				const toast = Toast.makeText("Lecture");
				toast.show();
			} catch (err) {
				alert(err.message);
			}
    },
    onDelete(id) {
			this.db.execSQL('DELETE FROM Sounds WHERE id=?', [id])
			.then(() => {
				this.$emit('deletedSound');
			});
		},
	}
}
</script>
<style scoped>
	Tabs TabStrip {
		background-color: #e74c3c;
		color: #fff;
		highlight-color: #fff;
	}
	Tabs TabStrip label {
		color: #fff;
	}
</style>