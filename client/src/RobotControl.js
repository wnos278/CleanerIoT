import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import { Avatar } from '@mui/material';
import axios from 'axios';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';


function sendCustomControlMessage() {
    axios.get('http://localhost:3000/message/turnoffauto')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendAutoControlMessage() {
    axios.get('http://localhost:3000/message/turnonauto')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendTurnLeftMessage() {
    axios.get('http://localhost:3000/message/turnleft')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendTurnRightMessage() {
    axios.get('http://localhost:3000/message/turnright')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendTurnUpMessage() {
    axios.get('http://localhost:3000/message/turnup')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function sendTurnDownMessage() {
    axios.get('http://localhost:3000/message/turndown')
        .then(function (response) {
            if (response.data["response"]["result"] === 1)
                // alert("Done!")
                {}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

export default function LedControl() {
    const theme = useTheme();
    const handleClickCustomControl = () => {
        sendCustomControlMessage();
    }

    const handleClickAutoControl = () => {
        sendAutoControlMessage();
    }

    const handleClickTurnLeft = () => {
        sendTurnLeftMessage();
    }

    const handleClickTurnRight = () => {
        sendTurnRightMessage();
    }

    const handleClickTurnUp = () => {
        sendTurnUpMessage();
    }

    const handleClickTurnDown = () => {
        sendTurnDownMessage();
    }

    var ledIcon = 'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png';
    // if (isTurnOn)
    // else
    // ledIcon = 'http://www.wpsimplesponsorships.com/wp-content/uploads/2019/05/cropped-icon-256x256.png';
    return (
        <React.Fragment>
            <Title>??i???u khi???n M??y h??t b???i</Title>
            <br />
 
            <Grid container spacing={3}
                direction="row"
                justifyContent="center"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickTurnUp()} >
                    ??i l??n
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickTurnDown()} >
                    ??i xu???ng
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickTurnLeft()} >
                    Sang tr??i
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickTurnRight()} >
                    Sang ph???i
                </Button>

            </Grid>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickAutoControl()} >
                    ??i???u khi???n t??? ?????ng
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Avatar src={ledIcon} />}
                    onClick={() => handleClickCustomControl()} >
                    ??i???u khi???n b???ng tay
                </Button>
            </div>
        </React.Fragment>
    );
}
