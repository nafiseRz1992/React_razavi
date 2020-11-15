import React,{useState,useEffect} from "react";
import * as firebase from "services";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from '@material-ui/core/Button';
import { Link} from "react-router-dom";

const db = firebase.db.ref("/articles");
export default function Articles() {
  //const [curentId,setcurentId]=useState('');
  const [ArticleList,setArticleList]=useState( []);
  const [idlist,setidlist]=useState( []);
useEffect(()=>{
db.on("value", snapshot => {
  let ArticleList = [];
  let idlist=[];
  snapshot.forEach(snap => {
      // snap.val() is the dictionary with all your keys/values from the 'students-list' path
     ArticleList.push(snap.val());
     idlist.push(snap.key);
   
  });
  setArticleList(ArticleList);
  setidlist(idlist)
}); 

},[])
/*const addOrEdit = (obj) => {  
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
 */
  return (
   
    <div className="MainDiv">
    <div class="jumbotron text-center bg-sky">
        <h3>Articles List :)</h3>
    </div>
  
    <div className="row">
      
      
        
      
        <div className="container">
            <table id="example" class="display table">
              <thead class="thead-dark">
                  <tr>
                      <th>title</th>
                      <th>body</th>
                      <th>amage</th>
                      <th>action</th>
                      
                  </tr>
              </thead>
              <tbody>
              {Object.keys(ArticleList).map(id => {
                  
                  return (
                      <tr key={id}> 
                      <td>{ArticleList[id].title}</td>    
                      <td>{ArticleList[id].body}</td>
                      <td><img src={ArticleList[id].imageURL} width="80px"/></td>
                      <td> 
                         <Link  variant="button"
                          color="textPrimary"
                          to={`/post/${idlist[id]}`}
                         
                         >Show post </Link>
                          </td>
                      </tr>
                      
                  );
                 
                  })}
           
              </tbody>
       
           </table>
            
       
       
      
       </div>
 
    </div>
</div>
  );
}
