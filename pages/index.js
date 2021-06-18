import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import React, {useEffect, useRef} from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import * as tf from "@tensorflow/tfjs";

import { getSortedPostsData } from '../lib/posts'



export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
function createData(name, value) {
    return {name, value};
}

const rows = [
    createData('Batch Size', 32),
    createData('Optimizer', "Adam"),
    createData('Learning Rate', 0.001),
    createData('Epochs', 20),
    createData('Loss', "MSE"),
    createData('Training Data size', 500)
];
export default function Home({ allPostsData }) {
const userInputValueRef = useRef(0)
const predictionValueRef = useRef()

    useEffect(() => {
        tf.ready().then(() => {
            loadModel()
        });
    }, [])

    async function loadModel() {
        try {
            const model = await tf.loadLayersModel('/model/model.json');
            // const model = await tf.loadLayersModel(
            //     'https://drive.google.com/file/d/17vPjVU8yhw0sIAvTHxX5yNS3M_fh3hTx/view?usp=sharing');
            // https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json
            //     const model = await tf.loadLayersModel(
            // "../model.json");
            model.summary();
            console.log("Load model success")
        } catch (err) {
            console.log(err);
        }
    }




    return (
        <div>
            <AppBar position="static" className={utilStyles.AppBar}>
                <Toolbar>
                    <Typography variant="h6" className={utilStyles.title}>
                        Deep Learning - André Schwarz
                    </Typography>
                    {/*<Link to="/documentation">*/}
                    {/*    <Button color="primary" className={utilStyles.DokuButton}>Aufgabe 3 - Zur Dokumentation</Button>*/}
                    {/*</Link>*/}
                </Toolbar>
            </AppBar>

            <div className={utilStyles.content}>
                <Button variant="contained" color="primary" className={utilStyles.funcButton}> Wert
                    vorhersagen</Button>
                <div className={utilStyles.horizontalImages}>
                    <TextField id="userInput" label="User Input" type="number" variant="outlined"
                               inputRef={userInputValueRef}/>
                    <TextField
                        id="prediction"
                        InputProps={{
                            readOnly: true,
                        }}
                        className={utilStyles.prediction}
                        inputRef={predictionValueRef}
                    />

                </div>

                <Button color="primary"
                        className={utilStyles.funcButton}>Modellerstellung
                    neustarten</Button>

                <TableContainer component={Paper} className={utilStyles.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}