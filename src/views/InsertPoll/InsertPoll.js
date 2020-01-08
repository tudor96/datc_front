import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from '@material-ui/core/Grid';
import avatar from "assets/img/faces/marc.jpg";
import QuestionCard from "components/QuestionCard/QuestionCard";
import QuestionList from "components/QuestionList/QuestionList";
import 'date-fns';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


import axios from "axios";
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

const ExampleCustomInput = ({ value, onClick }) => (
    <Button color="primary" className="example-custom-input" onClick={onClick}>{value}</Button>
  );


export default function InsertPoll() {
    const [questions, setQuestions] = useState([]);
    const classes = useStyles();
    const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());



    function addQuestionHandler() {
        let newId = 1;
        if (questions.length === 0) {
            newId = 1;
        } else {
            newId = questions[questions.length - 1].id + 1;
        }
        setQuestions([...questions, { "id": newId, "name": "", "options": [], "editState": true }]);
        console.log("questions", questions);
    }
    function addParlHandler() {
        let newId = 1;
        if (questions.length === 0) {
            newId = 1;
        } else {
            newId = questions[questions.length - 1].id + 1;
        }
        setQuestions([...questions, { "id": newId, "name": "Parlamentare", "options": [], "editState": true }]);
        console.log("questions", questions);
    }
    function addPrezHandler() {
        let newId = 1;
        if (questions.length === 0) {
            newId = 1;
        } else {
            newId = questions[questions.length - 1].id + 1;
        }
        setQuestions([...questions, { "id": newId, "name": "Prezidentiale", "options": [], "editState": true }]);
        console.log("questions", questions);
    }

    function saveQuestionHandler(id, question) {
        console.log("saveQuestionHandler:::", id, question)
        let newQuestionsState = questions.map((stateQ, index) => {
            if (index === id - 1) {
                stateQ.name = question.name;
                stateQ.options = question.options;
                stateQ.editState = false;
            }
            return stateQ;
        })
        console.log(newQuestionsState);
        setQuestions(newQuestionsState);
        // props.questions[id-1].editState = false;
    }

    function editFunctionHandler(id) {
        console.log("editFunctionHandler:::", id)
        let newQuestionsState = questions.map((stateQ, index) => {
            if (index === id - 1) {
                stateQ.editState = true;
            }
            return stateQ;
        })
        console.log(newQuestionsState);
        setQuestions(newQuestionsState);
        // props.questions[id-1].editState = false;
    }

    function savePoll() {
        let url = 'https://votedatc.herokuapp.com/api/v1.0/platform/election';
        const cnp = localStorage.getItem("cnp");
        let saveQuestionState = questions.map((stateQ, index) => {
            let saveQuestion = {
                "name": stateQ.name,
                "options": stateQ.options
            }
            return saveQuestion;
        })

        console.log(selectedDateStart);
        console.log("TRIMIS PE BACK INTREBARI::", saveQuestionState);
        axios.post(url, {
            "name": document.getElementById("poll-name").value,
            "description": document.getElementById("poll-description").value,
            "startDate": selectedDateStart,
            "endDate": selectedDateEnd,
            "questions": saveQuestionState
        }, {
            headers: {
                'x-user-cnp': cnp,
            },
            withCredentials: true
        })
            .then(function (response) {

                alert("Poll Saved!");
            })
            .catch(function (error) {
                console.log(error);
                alert("Faild to save poll!");
            });
    }
    // React.useEffect(() => {
    //     console.log("rerendering>!");
    // }, [questions]);

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={1}>
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Adauga un eveniment nou de votare.</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Nume eveniment"
                                        id="poll-name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={8}>
                                    <CustomInput
                                        labelText="Scurta descriere a evenimentului de votare."
                                        id="poll-description"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 5
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                 
                                    <DatePicker
                                        selected={selectedDateStart}
                                        onChange={date => setSelectedDateStart(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        customInput={<ExampleCustomInput />}
                                    />
                                   
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                 
                                 <DatePicker
                                     selected={selectedDateEnd}
                                     onChange={date => setSelectedDateEnd(date)}
                                     showTimeSelect
                                     timeFormat="HH:mm"
                                     timeIntervals={15}
                                     timeCaption="time"
                                     dateFormat="MMMM d, yyyy h:mm aa"
                                     customInput={<ExampleCustomInput />}
                                 />
                                
                             </GridItem>
                                {/* <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#AAAAAA" }}>End Date</InputLabel>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog-end"
                                                label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                value={selectedDateEnd}
                                                onChange={handleDateChangeEnd}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker-end"
                                                label="Time picker"
                                                value={selectedDateEnd}
                                                onChange={handleDateChangeEnd}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </GridItem> */}
                            </GridContainer>
                            <QuestionList questions={questions} saveQuestionHandler={saveQuestionHandler}
                                editFunctionHandler={editFunctionHandler}
                            ></QuestionList>
                            <GridContainer>


                            </GridContainer>
                            {/* <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Country"
                                        id="country"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Postal Code"
                                        id="postal-code"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                                    <CustomInput
                                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                                        id="about-me"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 5
                                        }}
                                    />
                                </GridItem>
                            </GridContainer> */}

                        </CardBody>

                        <CardFooter>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={addParlHandler}>Adauga parlamentare</Button></GridItem>
                                <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={addPrezHandler}>Adauga prezidentiale</Button></GridItem>
                                <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={addQuestionHandler}>Adauga intrebare de referendum</Button></GridItem>
                                <GridItem xs={12} sm={12} md={12}><Button color="primary" onClick={savePoll}>Save Poll</Button></GridItem>
                            </GridContainer> 
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
