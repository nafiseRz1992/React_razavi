import React,{useState,useEffect} from "react";
import * as firebase from "services";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import EditArticle from "./EditArticle"
const db = firebase.db.ref("/articles");

export default function Articles() {
  const [curentId,setcurentId]=useState('');
  const [ArticleList,setArticleList]=useState( []);
    
useEffect(()=>{
db.child('Articles').on("value", snapshot => {
  let ArticleList = [];
  snapshot.forEach(snap => {
      // snap.val() is the dictionary with all your keys/values from the 'students-list' path
     ArticleList.push(snap.val()); 
  });
  setArticleList(  ArticleList );
});   
},[])
const addOrEdit = (obj) => {  
  if (curentId === '')  
        db.child('Articles').push(  
          obj,  
          err => {  
              if (err)  
                  console.log(err)  
              else  
              setcurentId('')  
          })  
  else  
       db.child(`Articles/${curentId}`).set(  
          obj,  
          err => {  
              if (err)  
                  console.log(err)  
              else  
                 setcurentId('')  
          })  
}  
 
  return (
   
    <div className="MainDiv">
    <div class="jumbotron text-center bg-sky">
        <h3>Articles List :)</h3>
    </div>
  
    <div className="row">
       <div className="col-md-5">
       <EditArticle  {...({addOrEdit,curentId,ArticleList})}/>
       </div>
       <div className="col-md-7">
       <div className="MainDiv">
        
      
        <div className="container">
            <table id="example" class="display table">
              <thead class="thead-dark">
                  <tr>
                      <th>title</th>
                      <th>body</th>
                      <th>action</th>
                      
                  </tr>
              </thead>
              <tbody>
              {Object.keys(ArticleList).map(id => {
                  
                  return (
                      <tr key={id}> 
                      <td>{ArticleList[id].title}</td>    
                      <td>{ArticleList[id].body}</td>
                      <td> <Button  onClick={ () => setcurentId( id )} >Edit</Button > </td>
                      </tr>
                      
                  );
                 
                  })}
           
              </tbody>
       
           </table>
            
       </div>
       
      </div>
       </div>
    </div>
</div>
  );
}
