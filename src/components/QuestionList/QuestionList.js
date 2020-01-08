import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import QuestionCard from "components/QuestionCard/QuestionCard";
import ParlamentarCard from "components/QuestionCard/ParlamentarCard";

import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import PrezidentialCard from 'components/QuestionCard/PrezidentialCard';
export default function QuestionList(props) {

    React.useEffect(() => {
        console.log("UPDATED QUESTIONS", props.questions);
    }, [props.questions]);


    function handleChange() {
        console.log("change of option")
    }
    return (
        <div>
            {props.questions.map((question, index) => (
                <GridContainer key={question.id}>
                    {console.log("question", question)}
                    {question.name === "Parlamentare" ?
                        <ParlamentarCard
                            id={question.id}
                            saveQuestionHandler={props.saveQuestionHandler}
                            editFunctionHandler={props.editFunctionHandler}
                            handleChange={handleChange}
                            editState={question.editState}
                        /> : question.name === "Prezidentiale" ?
                            <PrezidentialCard
                                id={question.id}
                                saveQuestionHandler={props.saveQuestionHandler}
                                editFunctionHandler={props.editFunctionHandler}
                                handleChange={handleChange}
                                editState={question.editState}
                            /> :
                            <QuestionCard
                                id={question.id}
                                saveQuestionHandler={props.saveQuestionHandler}
                                editFunctionHandler={props.editFunctionHandler}
                                handleChange={handleChange}
                                editState={question.editState}
                            />

                    }

                </GridContainer>
            ))}

        </div>

    )
}
