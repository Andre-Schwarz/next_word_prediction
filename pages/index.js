import utilStyles from '../styles/utils.module.css'
import React, {useState, useEffect, useRef, useCallback} from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import * as tf from "@tensorflow/tfjs";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';

import indexToString from '../utils/indexToString';
import stringToIndex from '../utils/stringToIndex';
import Link from "next/link";

export default function Home() {
    const userInputValueRef = useRef("")
    const [predictions, setPredictions] = useState([""]);

    const onChangeHandler = event => {
        let value = event.target.value
        value = value.toLowerCase().split(' ').filter(value1 => value1 != "")
        console.log(value)

        if (value.length >= NUMBER_OF_WORDS) {
            console.log("greater = 3")
            executePrediction(value)
        }
    }

    const NUMBER_OF_WORDS = 3;
    let model;

    useEffect(() => {
        tf.ready().then(async () => {
            model = await tf.loadLayersModel('/model/model.json');
            console.log("Load model success")
        });
    }, [model])

    function addPredictionToUserInput(prediction) {
        console.log("add prediction to user input")

        let value = userInputValueRef.current.value;

        // userInputValueRef.current.value = value + " " + prediction
    }

    async function executePrediction(value) {
        try {
            await predictWord(value, 5).then(value => {
                console.log(value);
                setPredictions(value)
            })
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
        let indexes = wordToIndexConverter(sentence);

        console.log(indexes)

        async function executePrediction() {
            const prediction = await model.predict(tf.tensor([indexes]));
            const lastWordPrediction = (await prediction.data())
            return indexToWordConverter(
                await doArgMax(lastWordPrediction, numPrediction)
            );
        }

        if (indexes.length >= NUMBER_OF_WORDS) {
            indexes = indexes.slice(-NUMBER_OF_WORDS); // take the last 3 values

            if (model === undefined) {
                console.log("reload model")
                tf.ready().then(async () => {
                    model = await tf.loadLayersModel('/model/model.json');
                    console.log("Load model success")
                    return await executePrediction();
                });
            } else {
                return await executePrediction();
            }
        }
    }

    const indexToWordConverter = arrOfIndexes => {
        let arrOfStrings = [];
        console.log("index array", arrOfIndexes)
        arrOfIndexes.forEach(index => {
            let word = indexToString[index];
            console.log("word", word)
            arrOfStrings.push(word);
        });
        return arrOfStrings;
    };

    const wordToIndexConverter = arrOfString => {
        let arrOfIndexes = [];
        arrOfString.forEach(word => {
            let index = stringToIndex[word];
            if (index !== undefined) {
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
                    <Button color="primary" className={utilStyles.DokuButton}>
                        <Link href="/documentation">
                            <a>Aufgabe 4 - Zur Dokumentation</a>
                        </Link>
                    </Button>
                    {/*</Link>*/}
                </Toolbar>
            </AppBar>

            <div className={utilStyles.content}>
                <h2>
                    Next Word Prediction
                </h2>

                <Button variant="contained" color="primary" className={utilStyles.funcButton}
                        onClick={executePrediction}> Wert
                    vorhersagen</Button>
                <p>
                    Willkommen zur Next Word Prediction auf Basis des Buches "The Adventures of Sherlock Holmes, by
                    Arthur Conan Doyle"
                </p>
                <p>
                    Bitte geben Sie mindestens 3 Wörter in englischer Sprache ein, um die Wortvorhersage zu starten.
                </p>

                <div>
                    <TextField id="userInput" label="Geben Sie hier mindestens 3 englische Wörter ein" type="text"
                               variant="outlined"
                               className={utilStyles.userInput}
                               onChange={onChangeHandler}
                    />
                </div>

                {(predictions.length > 0) ?
                    <p>
                        Vorhersageergebnisse:
                    </p>
                    : null}

                <List component="nav" aria-label="main mailbox folders">
                    {predictions.map((prediction) => (
                        <ListItem key={prediction}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={prediction}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}