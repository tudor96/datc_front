import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const axios = require('axios');


const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    cardTitle
  }));

export default function ParlamentarCard(props) {
    const [options, setOptions] = useState([{ "id": 1, "name": "" }]);
    const classes = useStyles();
    const [partide, setPartide] = useState([]);
    const [partid, setPartid] = React.useState([{"name": "", "description": ""}]);


    React.useEffect(() => {
        const url =  "https://votedatc.herokuapp.com/api/v1.0/platform/election/partid"
        const cnp = localStorage.getItem("cnp");


        axios.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'x-user-cnp': cnp
          },
          withCredentials: true
        })
          .then(function (response) {
              console.log("PARTIDE", response);
            setPartide(response.data);
          })
          .catch(function (error) {
          })
      }, []);

    function addOptionHandler() {
        let newId = options[options.length - 1].id + 1;
        setOptions([...options, { "id": newId, "name": "" }]);
        setPartid([...partid, {"nume": "", "description": ""}]);

        console.log("option", options);
    }

    function saveQuestionHandler() {
        let question = { "name": "Parlamentare", "options": [] }
        let allOptions = [];
        options.map((option, index) => {
            allOptions.push({ "name": partid[index].name, "description": document.getElementById("description" + option.id).value, "idPartid": partid[index].idPartid });
        })
        question.options = allOptions;
        props.saveQuestionHandler(props.id, question)
    }

    function editFunctionHandler() {
        props.editFunctionHandler(props.id);
    }


    const handleChange = (event, id) => {
        let newPartid = partid.map((stateQ, index)=>{
            if (index === id) {
                stateQ.name = event.target.value.name;
                stateQ.description = event.target.value.description;
                stateQ.idPartid =event.target.value.id;
            }
            return stateQ;
        })

        setPartid(newPartid);
    };


    if (partide.length === 0)
        return (
            <div>
                Loading...
            </div>
        )


    return (
        <Card style={{ width: "60rem" }}>
            <CardHeader color="info">
                Alegeri Parlamentare
            </CardHeader>
            <CardBody>
                <p>
                    Adauga Candidati
                </p>


                {options.map((option, index) => (
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel id={"selectLabel" + option.id}>Partid</InputLabel>
                                <Select
                                    
                                    id={"select" + option.id}
                                    value={"Partid"}
                                    onChange={event => handleChange(event, index)}
                                    inputProps={{
                                        disabled: !props.editState
                                    }}
                                >
                                    {partide.map((p, index) => (
                                        <MenuItem value={p}>{p.name} -- {p.description}</MenuItem>
                                    ))}
                                </Select>
                                <h4 id= {"h4" + option.id} >{partid[index].name=== null? "Partid": partid[index].name}</h4>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Introduce-ti lista de candidati"
                                id={"description" + option.id}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5.,
                                    disabled: !props.editState
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                ))}

                {props.editState ?
                    <GridContainer>
                        <Button color="primary" onClick={addOptionHandler}>Add Option</Button>
                        <Button color="rose" onClick={saveQuestionHandler}>Save Question</Button>
                    </GridContainer>
                    :
                    <Button color="warning" onClick={editFunctionHandler}>Edit Question</Button>}

            </CardBody>
        </Card>
    );
}