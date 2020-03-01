import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
/**** Material UI */
import { makeStyles } from '@material-ui/core/styles';
import  {MenuItem, FormControl, Select, InputLabel} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 600,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const GET_QUESTIONS = gql`
    query($first:Int, $filter:String){
        questions(first:$first, filter:$filter)
        {
          chapter{
            chap_name
            chap_id
          }
        }
    }
  
`;

function Chapters ({first, offset, filter, setChapId, setCN, setFirst, setOffset,}) {   
        const classes = useStyles();
        const { loading, error, data } = useQuery(GET_QUESTIONS, {
          variables: {first, filter}
        });
        const handleChange = (event, {props}) => {
          setChapId(event.target.value);
          setCN(props.name);
          setFirst(first = 0)
         // setOffset(offset = 10)
          

        };
        if (loading) return <p>Loading chapters...</p>;
        if (error) return   <p>Error :(...</p>
        if (data && data.questions){
         // console.log(data.questions)
        const MenuEl = data.questions.map(({chapter }, key) => 
                <MenuItem style={{marginRight:10,marginBottom:10}} key={key} value={chapter.chap_id} name={chapter.chap_name}>{chapter.chap_name}</MenuItem>

        )
        return (
          <FormControl className={classes.formControl} >
          <InputLabel id="demo-simple-select-label">Please select a Chapter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           // labelWidth={labelWidth}
            //value='s'
            onChange={handleChange}
          >
            {MenuEl}
          </Select>
        </FormControl>
         
          
          
        )
    }
}
    
export default Chapters;