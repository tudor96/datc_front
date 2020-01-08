import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

const axios = require('axios');

function createData(name, desc, startDate, endDate, pollId) {
    // const density = population / size;
    return { name, desc, startDate, endDate, pollId };
}
const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

function useFetch(url) {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        const cnp = localStorage.getItem("cnp");


        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-user-cnp': cnp
            },
            withCredentials: true
        })
            .then(function (response) {
                console.log("POLL LIST", response.data);
                const rows = [];
                response.data.forEach((poll, index) => {
                    let cPoll = poll;
                    console.log(cPoll.name, cPoll.description, cPoll.startDate, cPoll.endDate);
                    rows.push(createData(cPoll.name, cPoll.description, cPoll.startDate, cPoll.endDate, cPoll.id));
                });
                setData(rows)
                setError(null)
                setLoading(false)
            })

            .catch(function (error) {
                setData([])
                setError(null)
                setLoading(false)
            })
    }, [url])

    return { loading, data, error }
}

export default function TableList() {
    const classes = useStyles();
    //   const { loading, data: rows, error } = useFetch(
    //     `https://votedatc.herokuapp.com/api/v1.0/platform/election`
    //   )
    const [cardState, setCardState] = useState(false);
    const [poll, setPoll] = useState({});
    const [admin, setAdmin] = useState('');
    function handleRowReq(id) {
        const url = "https://votedatc.herokuapp.com/api/v1.0/platform/election/partid" ;
        const cnp = localStorage.getItem("cnp");

        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-user-cnp': cnp
            },
            withCredentials: true
        })
            .then(function (response) {
                console.log("POLL REQ", response.data);

                setPoll(response.data[0])
                setCardState(true);
            })

            .catch(function (error) {
                console.warn(error.message)
            })
    }

    function searchAdmin() {
        const email = document.getElementById("admin-email").value;
        const cnp = localStorage.getItem("cnp");
        const url = "https://votedatc.herokuapp.com/api/v1.0/platform/user/";
        axios.get(url, {
          params: {
            email: email
          },
          headers: {
              'x-user-cnp': cnp
          }
        })
        .then(function (response) {
            setAdmin(response.data[0])
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        }); 
    }

    function setAdminHandler () {
        const cnp = localStorage.getItem("cnp");
        const url = "https://votedatc.herokuapp.com/api/v1.0/platform/user/admin/" + admin.id;
        axios.put(url, {
            "isAdmin": 1,
        }, {
            headers: {
                'x-user-cnp': cnp
            },
            withCredentials: true
        })
            .then(function (response) {
    
                alert("Adminul a fost setat");
            })
            .catch(function (error) {
                console.log(error);
                alert("Eroare la setarea adminului");
            });
    }
    function addPartid() {
        let url = 'https://votedatc.herokuapp.com/api/v1.0/platform/election/partid';
        const cnp = localStorage.getItem("cnp");


        axios.post(url, {
            "name": document.getElementById("partid-name").value,
            "description": document.getElementById("partid-description").value,
        }, {
            headers: {
                'x-user-cnp': cnp,
            },
            withCredentials: true
        })
            .then(function (response) {

                alert("Partid Adaugat");
            })
            .catch(function (error) {
                console.log(error);
                alert("Nu sa putut adauga partidul!");
            });
    }

    //   if (loading === true) {
    //     return <p>Loading</p>
    //   }


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Adauga admin</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Nume user"
                                    id="admin-email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: false
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={searchAdmin}>Cauta User</Button></GridItem>
                            {admin !== '' ?                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                    {admin.firstname} - {admin.lastname}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={setAdminHandler}>Seteaza admin</Button></GridItem>
                            </GridContainer>: "" }
                        </GridContainer>
                    </CardBody>
                </Card>



            </GridItem>

            <GridItem xs={12} sm={12} md={12}>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Adauga Partid Nou</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Nume Partid"
                                    id="partid-name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: false
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Descriere"
                                    id="partid-description"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: false
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={addPartid}>Adauga Partid</Button></GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>



            </GridItem>
        </GridContainer>
    );
}
