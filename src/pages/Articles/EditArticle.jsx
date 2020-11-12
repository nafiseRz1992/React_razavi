import React,{ useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
//import { ArticleService } from "components/Article";


export default function EditArticle(props) {


  //  const onSubmit = article => {
 //    ArticleService.create(article)
 //      .then(() => alert("done"))
 //      .catch(error => console.log(error));
//  }; 

const initialFieldValues = {
          title: '',  
          body: '' 
          
      }  
    
      var [values, setValues] = useState(initialFieldValues)  
  
      useEffect(() => {  
        if (props.curentId === '')  
            setValues({
              ...initialFieldValues
            })  
        else  
            setValues({  
                ...props.ArticleList[props.curentId]  
            })  
    }, [props.curentId, props.ArticleList])  
    
      const handleInputChange = e => {  
          var { name, value } = e.target;  
          setValues({  
              ...values,  
              [name]: value  
          })  
      }  
    
      const handleFormSubmit = e => {  
          e.preventDefault()  
          props.addOrEdit(values);  
      }  
  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            defaultValue=""
            value={values.title} 
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          
           
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="body"
            label="Body"
            defaultValue=""
            variant="outlined"
            value={values.body} 
            onChange={handleInputChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            value={props.curentId===''?"save":"Update"}
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
         
        </Grid>
      </Grid>
    </form>
  );
}
