import * as firebase from "services";
import react from 'react';

const db = firebase.db.ref("/articles");

class ArticleService extends react.Component {
  constructor(props){
    super(props);
     this.state = {
      developers: []
    }
  }
  getAll = () => {
      db.on('value', snapshot => {
        const state = snapshot.val();
        this.setState(state);
      });
      console.log('DATA RETRIEVED');
      return db;
    }
  
  get(id){
    return db.child(id);
  }

  create(article) {
    return db.push(article);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).delete();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ArticleService();
