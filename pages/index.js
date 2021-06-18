import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
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

import {getSortedPostsData} from '../lib/posts'

import { indexToString } from '../utils/indexToString';
import { stringToIndex } from '../utils/stringToIndex';

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
export default function Home({allPostsData}) {
    const userInputValueRef = useRef(0)
    const predictionValueRef = useRef()
    let isQuestion = false;
    const NUMBER_OF_WORDS = 3;
    let model;
    let randomNumber = [];

    useEffect(() => {
        tf.ready().then(() => {
            loadModel()
        });
    }, [])

    async function loadModel() {
        try {
            model = await tf.loadLayersModel('/model/model.json');
            // model.summary();

            console.log("Load model success")
            await predictWord("hello my name is".trim(), 5).then(value => console.log(value))
        } catch (err) {
            console.log(err);
        }
    }

    const doArgMax = async (prediction, numPrediction) => {
        let argmaxIndexes = [];
        for (let i = 0; i < numPrediction; i++) {
            let argmaxIndex = await tf.argMax(prediction).data();
            argmaxIndexes.push(argmaxIndex);
            prediction[argmaxIndex] = 0;
        }
        return argmaxIndexes;
    };

    async function predictWord(sentence, numPrediction) {
        // isQuestion = false;
        sentence = sentence.toLowerCase().split(' ');
        let indexes = wordToIndexConverter(sentence);
        if (indexes.length >= NUMBER_OF_WORDS) {
            // notice.style.display = 'none';
            indexes = indexes.slice(-NUMBER_OF_WORDS);
            const prediction = await model.predict(tf.tensor([indexes]));
            const lastWordPrediction = (await prediction.data()).slice(
                (NUMBER_OF_WORDS - 1) * 1e4,
                NUMBER_OF_WORDS * 1e4
            );
            let predictionString = indexToWordConverter(
                await doArgMax(lastWordPrediction, numPrediction)
            );
            return predictionString;
        } else {
            // notice.style.display = 'block';
        }
    }

    const indexToWordConverter = arrOfIndexes => {
        let arrOfStrings = [];
        arrOfIndexes.forEach(index => {
            let word = indexToString[index];
            if (word === '<eos>') {
                if (isQuestion) {
                    word = '?';
                } else {
                    word = '.';
                }
            }
            if (word === 'N') {
                randomNumber.push(Math.floor(1e3 * Math.random()));
                word = randomNumber[Math.floor(Math.random() * randomNumber.length)];
            }
            if (word === '<unk>') {
                word = 'rareword';
            }
            arrOfStrings.push(word);
        });
        return arrOfStrings;
    };

    const wordToIndexConverter = arrOfString => {
        let arrOfIndexes = [];
        arrOfString.forEach(word => {
            if (word === 'rareword') {
                word = '<unk>';
            }
            if (randomNumber.includes(Number(word))) {
                word = 'N';
            }
            if (
                'what' === word ||
                'why' === word ||
                'who' === word ||
                'how' === word ||
                'whose' === word ||
                'when' === word ||
                'whom' === word ||
                'which' === word ||
                'where' === word
            ) {
                isQuestion = true;
            }
            if (word === '.' || word === '?') {
                word = '<eos>';
            }
            let index = stringToIndex[word];
            if (index === undefined) {
                arrOfIndexes.push(1); // 1 = '<unk>'
            } else {
                arrOfIndexes.push(index);
            }
        });
        return arrOfIndexes;
    };

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