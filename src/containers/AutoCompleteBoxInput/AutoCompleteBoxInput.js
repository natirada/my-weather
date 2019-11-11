/* eslint-disable no-use-before-define */
import React,{useState} from 'react';
import classes from './AutoCompleteBoxInput.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


const token = 'm9lAGyPN4SxWZAFBBSghB43DxuBB1VDj';

const AutoCompleteBoxInput = (props) => {

   const [suggestionList, setsuggestionList] = useState([]) 
   const [input, setinput] = useState('');

   const getUpdateSuugetionList = (e) => {
      const input = e.target.value;
      if(input.length === 0) {
          return;
      }
      setinput(input)
      axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${token}&&q=${input}`)
      .then(res => {
            const fiveSuggetionList = res.data.slice(0,5);
            const updateSuugetionList = [];
            fiveSuggetionList.forEach(el => {
                let updateCity = {
                    city: el.LocalizedName,
                    country: el.Country.LocalizedName,
                    key: el.Key
                }
                updateCity.toString = function() {
                    return `${this.city}, ${this.country}`;
                }
                updateSuugetionList.push(updateCity);
            });
    
            
            setsuggestionList(presuggestionList =>  [...updateSuugetionList]);
             
      }).catch(err => {

      })


   }

  const onClickOption = (optionSelected) => {
    props.clickOption(optionSelected);
    
  }


 
  return (
  <div className={classes.Flexbox}>
        <Autocomplete
        freeSolo
        disableClearable
        options={suggestionList}
        onChange={(event, value) => {
          onClickOption(value);
        }}
        renderOption={option => (
            <React.Fragment>
              <span 
               >{option.city}, {option.country}</span>
            </React.Fragment>
          )}
        renderInput={params => (           
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={getUpdateSuugetionList}
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
  </div>   
  );
}

export default AutoCompleteBoxInput;