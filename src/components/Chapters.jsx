import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function Chapters ({first, filter, setChapId, setCN}) {   
        const classes = useStyles();
        const { loading, error, data } = useQuery(GET_QUESTIONS, {
          variables: {first, filter}
        });
        const handleChange = (event, {props}) => {
          setChapId(event.target.value);
          setCN(props.name);

        };
        if (loading) return <p>Loading chapters...</p>;
        if (data && data.questions){
          console.log(data.questions)
        const MenuEl = data.questions.map(({chapter }, index) => 
                <MenuItem style={{marginRight:10,marginBottom:10}} value={chapter.chap_id} name={chapter.chap_name}>{chapter.chap_name}</MenuItem>

        )
        return (
          <FormControl className={classes.formControl}>
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