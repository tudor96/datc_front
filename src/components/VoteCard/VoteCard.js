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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default function VoteCard(props) {
    const classes = useStyles();
    const [poll, setPoll] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [event, setEvent] = React.useState({});
    const [question, setQuestion] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('');
    
    const handleClickOpen = (event, question) => {
        setQuestion(question);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (event) => {
        // setPoll(event.target.value.name);
        setSelectedOption(event.target.value);

    };


    function voteHandler() {
        console.log("questionID", question.id, );
        console.log("code:", document.getElementById("code" ).value );
        console.log("questionID", question.options[selectedOption] );
        const url = "https://votedatc.herokuapp.com/api/v1.0/platform/user/vote";
        const cnp = localStorage.getItem("cnp");
        if (question.id === undefined || question.options[selectedOption] === undefined || selectedOption === '' || document.getElementById("cnp" ).value === '' || document.getElementById("code" ).value === '') {
            alert("Nu ati completat toate campurile");
            return;
        }

        axios.put(url, {
            "idQuestion": question.id,
            "uniqueCode": document.getElementById("code" ).value,
            "optionId": question.options[selectedOption].id,

    
        }, {
            headers: {
                'x-user-cnp': document.getElementById("cnp" ).value,
            },
            withCredentials: true
        })
            .then(function (response) {
    
                alert("Mailul cu codul de inregistrare sa trimis!");
            })
            .catch(function (error) {
                console.log(error);
                alert("EROARE LA VOTARE INCERCATI DIN NOU");
            });

        setOpen(false);
    }


    React.useEffect(() => {
        console.log("PROPS", props.pollId)
        if (props.pollId !== undefined && props.pollId !== null && props.pollId !== '') {
            const url = "https://votedatc.herokuapp.com/api/v1.0/platform/election/" + props.pollId;
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
                    setPoll(response.data[0]);
                })
                .catch(function (error) {
                })
        } else {

        }

    }, [props.pollId]);







    if (poll.length === 0)
        return (
            <div>
                Loading...
            </div>
        )


    return (
        <Card style={{}}>
            <CardHeader color="info">
                {poll.name}
            </CardHeader>
            <CardBody>

                {poll.questions.map(question => (
                    <GridItem xs={12} sm={12} md={5}>
                        <h3 className={classes.cardCategory}>{question.name}</h3>
                        {question.options.map(option => (
                            <h6 className={classes.cardTitle}>{option.name}</h6>
                        ))}
                        <Button color="primary" onClick={event => handleClickOpen(event, question)}>Voteaza</Button>
                    </GridItem>
                ))}





            </CardBody>

            {question !== '' ? <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> {question.name} </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                {question.description}
                                {question.options.map((option, index) => (
                                    <h6 key={index} className={classes.cardTitle}>{option.name}</h6>
                                ))}
                            </GridItem>

                            
                            <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel  id="demo-simple-select-outlined-label">
                                            Optiune
                                        </InputLabel>
                                        <Select
                                            labelid="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={selectedOption}
                                            onChange={event => handleChange(event)}
                                            
                                        >
                                            {question.options.map((option, index) => (
                                                <MenuItem key={index} value={index}>{option.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                            

                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="CNP..."
                                    id="cnp"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="COD UNIC..."
                                    id="code"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6}>

                            </GridItem>
                        </GridContainer>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Disagree</Button>
                    <Button onClick={voteHandler} color="primary" autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
                : <div></div>
            }

        </Card>
    );
}