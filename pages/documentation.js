import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Paper from "@material-ui/core/Paper";
import utilStyles from "../styles/utils.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";


function createData(name, value) {
    return {name, value};
}

const rows = [
    createData('Batch Size', 32),
    createData('Optimizer', "Adam"),
    createData('Learning Rate', 0.001),
    createData('Epochs', 20),
    createData('Loss', "categorical_crossentropy"),
    createData('Training Data size', 500)
];


export default function FirstPost() {
    return (
        <div>
            <AppBar position="static" className={utilStyles.AppBar}>
                <Toolbar>
                    <Typography variant="h6" className={utilStyles.title}>
                        Deep Learning - André Schwarz
                    </Typography>
                    <Button color="primary" className={utilStyles.DokuButton}>
                        <Link href="/">
                            <a>Aufgabe 4 - Zur Dokumentation</a>
                        </Link>
                    </Button>
                    {/*</Link>*/}
                </Toolbar>
            </AppBar>

            <TableContainer className={utilStyles.table}>
                <Table aria-label="simple table">
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

            <div className={utilStyles.documentation}>
                <h1>Dokumentation und Herangehensweise</h1>
                <h2>Daten</h2>
                Für das Training des Netzes wurde das Buch „the adventures of sherlock holmes by arthur conan doyle“
                in
                englischer Sprache verwendet. Dieses Buch steht kostenlos zur freien Verfügung.

                <br/>
                <a href={"https://sherlock-holm.es/stories/pdf/a4/1-sided/advs.pdf"}>https://sherlock-holm.es</a>
                <br/>
                Dieser Datensatz enthält insgesamt 8072 verschiedene Worte (nach den Preprocessing Schritten)

                <h2>Preprocessing</h2>
                Um das Trainingsergebnis positiv zu beeinflussen, sollten einige Preprocessing Schritte vorgenommen
                werden.

                <h4>Remove numbers</h4>
                In dem Buch existieren einige Zahlen, die in keinem Zusammenhang zu sinnvollen Wörtern stehen (z.B.
                Kapitel Nummern). Daher macht es Sinn diese zu entfernen.

                <h4>Remove breaks</h4>
                Um den Datensatz schon vorab zu reduzieren, kann eine Entfernung der Whitespaces sinnvoll sein. Dazu
                gehören unnötige Leerzeichen, Absätze oder Umbrüche die für den Trainingserfolg keinen Einfluss
                haben.

                <h4>Remove Umlaut, special characters & single characters </h4>
                Sonderzeichen sollten aus dem Text entfernt werden, da diese kein sinnvolles Training begünstigen.
                Ebenfalls sollten Umlaute ausgeschrieben werden, um Störungen durch unterschiedliche Codierung im
                Browser zu reduzieren.

                <h2>Genauigkeit</h2>
                <h2>Visualisierung</h2>

                <h2>Tech Stack</h2>
                <h4>NextJS</h4>
                Diese Anwendung wurde mit NextJS erstellt. Hierbei handelt es sich um ein React Framework, mit dem ein
                „server side rendering“ möglich ist.
                Desweiteren bietet es die Möglichkeit eine API aufzubauen, um das TensorflowJS model zu laden. Die
                Schwierigkeit hierbei ist, dass das json model noch weitere Binärdateien nachladen muss, die die
                trainierten Gewichte enthalten.
                NextJS arbeitet sehr eng mit dem eigenen Deployment System Vercel zusammen, wodurch das Deployment der
                vorgerenderten Webseiten sehr komfortabel möglich war.

                <h4>Tensorflow</h4>
                Tensorflow ist ein Framework, das die Erstellung von Neuronalen Netzen ermöglicht. In diesem Fall wurde
                die Version für Javascript verwendet um ein trainiertes Modell im Browser verwenden zu können.
                Für das eigentliche Training des Modells wurde die Python Version von Tensorflow verwendet. Dies ist das
                gängige Verfahren bei der Erstellung von Modellen, da Python schon sehr gute Tools mitbringt, die bei
                der Datenverarbeitung helfen können.

                <h4>Tensorflow js Converter</h4>
                Tensorflow js bringt einen Converter mit, der es ermöglicht mit Python erstellte Modelle in ein von
                Tensorflow js nutzbares Format zu bringen.
                Dazu reicht im Terminal der Befehl:

                <code>tensorflowjs_converter --input_format=keras model.h5 ./web_model</code>

                <h4>Material UI</h4>
                Material UI wurde verwendet, um die Standard UI Komponenten zu benutzen.

                <h4>Schichten des Netzes</h4>

            </div>

        </div>
    )
}