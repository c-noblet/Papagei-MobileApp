import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import Sqlite from 'nativescript-sqlite';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    database: null,
    data: []
  },
  mutations: { 
    init(state, data) {
      state.database = data.database;
    },
    load(state, data) {
      state.data = [];
      for(let i = 0;i < data.data.length; i++) {
        state.data.push({
          title: data.data[i][0],
          url: data.data[i][1],
          pic: data.data[i][2],
          favorite: data.data[i][3],
          category: data.data[i][4],
          subscribeDate: data.data[i][5]
        })
      }
    },
    save(state, data) {
      state.data.push({
        title: data.data.title,
        url: data.data.url,
        pic: data.data.pic,
        favorite: data.data.favorite,
        category: data.data.category,
        subscribeDate: data.data.subscribeDate
      })
    }
    
  },
  actions: {
    init(context) {
      (new Sqlite('sounds.db')).then(db => {
        db.execSQL('CREATE TABLE IF NOT EXISTS sounds (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT, pic TEXT, favorite BOOLEAN, category TEXT, subscribeDate TEXT)')
        .then(id => {
          context.commit('init', { database: db });
        }, error => {
          console.log('CREATE TABLE ERROR', error);
        })
      }, error => {
        console.log('OPEN DB ERROR', error);
      });
    },
    insert(context, data) {
      context.state.database.execSQL('INSERT INTO sounds (title, url, pic, favorite, category, subscribeDate) VALUES (?, ?, ?, ?, ?, ?)', [data.title, data.url, data.pic, data.favorite, data.category, Date.now])
      .then(id => {
        context.commit('save', { data: data });
      }, error => {
        console.log("INSERT ERROR", error);
      });
    },
    query(context) {
      context.state.database.all('SELECT title, url, pic, favorite, category, subscribeDate FROM sounds', [])
      .then(result => {
        context.commit('load', { data: result });
      }, error => {
        console.log('SELECT ERROR', error);
      });
    }
  }
});

Vue.prototype.$store = store;

export default store;

store.dispatch('init');