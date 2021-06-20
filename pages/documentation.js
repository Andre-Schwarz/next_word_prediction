import Link from 'next/link'
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
    createData('Batch Size', 200),
    createData('Optimizer', "RMSprop"),
    createData('Learning Rate', 0.01),
    createData('Epochs', 20),
    createData('Loss', "categorical_crossentropy"),
    createData("Vocab Size", 8072)
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
                            <a>Aufgabe 4 - Zur Wortvorhersage</a>
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

                <h2>Repräsentation</h2>
                Bei der Vorbereitung des Trainings, wurde die einzelnen Worte des Datensatzes durch eine Zahlenrepräsentation
                ersetzt. Dabei wurden zwei JSON Dateien erzeugt, die ein Mapping von den Worten zu Zahlen, sowie umgekehrt enthalten.
                Durch dieses Vorgehen konnte das Netz mit Integer Werten trainiert werden, und das Ergebnis später in Worte umgewandelt werden.

                Das trainierte Netz baut auf einem Input von drei Wörtern auf. Es müssen dementsprechend mindestens drei Worte
                in das Netz gegeben werden um eine Vorhersage zu starten. Damit wurde versucht eine verbesserte Genauigkeit zu erzielen, da
                drei Worte im Zusammenhang trainiert wurden.

                <h2>Genauigkeit</h2>
                Bei der Modellerstellung wurde nach jedem Epoch die "categorical_accuracy" gemessen. Aus Zeit / Effektivitäts -Gründen
                wurde die Zahl der Epochs auf 20 festgesetzt.
                <br/>
                Die Genauigkeit belief sich nach dem ersten Durchlaug auf ca. 10% und konnte sich mit jedem Durchgang um
                ca. 1.5 % - 3 % steigern. Sodass letztendlich eine Genauigkeit von ca 46 % erreicht werden konnte.

                <code>Epoch 20/20
                    171/171 [==============================] - 31s 181ms/step - loss: 2.8763 - categorical_accuracy: 0.4635 - val_loss: 2.8704 - val_categorical_accuracy: 0.4554</code>

                <br/><br/>

                Eine Überprüfung der Ergebnise wurde vorgenommen und erzeugte folgendes Resultat:
                Die Ergebnisse sind manchmal sehr ungenau. Es konnte nicht immer das richtige Ergebnis gefunden werden. Dennoch kann bei der Eingabe von
                "Sherlock Sherlock Sherlock" bzw. "Dr Dr Dr" das Ergebnis zu 100 % "Holmes" bzw. "Watson" und "Grimesby" erreicht werden.
                (Der Grund für die Wortdopplungen werden im Kapitel Daten Repräsentation erläutert.)
                Letztendlich hat sich folgendes Verhalten gezeigt: <br/>
                Das Ergebnis ist absolut reproduzierbar richtig, oder es sagt sehr abwegige Worte vorher.

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
                Um ein möglichst hohe Genauigkeit zu erzielen, wurden viele Modelle mit verschiedenen Layern ausprobiert.
                Dabei wurde beobachtet, dass z.B. mehrere LSTM Layer hintereinander die Genauigkeit kaum verbessern konnten.
                Ebenfalls wurde auf das hinzufügen von mehreren Dense Layern verzichtet, da diese ebenfalls keine nennenswerten
                Genauigkeiten erzeugt haben. Die zu trainierenden Parameter variierten dabei von weit über 100.000.000
                bis 2.500.000. Die Zeit die benötigt werden würde um ein solch riesiges Netz zu trainieren belief sich auf
                über 6 Tage. (Genutzt wurde ein MacBook mit einem i7 Quad Core, 16 GB Ram und einer 4GB Grafikkarte.
                Gestartet wurde mit einem Macbook mit einem M1 Prozessor, auf dem jedoch kein Tensorflow läuft.)

                Die das Folgende Codebeispiel zeigt die letztlich genutzte Variante mit 3,557,672 zu trainierenden Parametern.

                <br/><br/>

                <code>
                    model = tf.keras.models.Sequential()
                    model.add(tf.keras.layers.Embedding(
                    total_words, hidden_size, input_length=num_steps))
                    model.add(tf.keras.layers.LSTM(units=hidden_size, return_sequences=True))
                    model.add(tf.keras.layers.Dense(total_words))
                    model.add(tf.keras.layers.Activation('softmax'))
                    model.compile(loss='categorical_crossentropy', optimizer=optimizer,
                    metrics=[tf.keras.metrics.categorical_accuracy])
                    return model
                </code>

                <h4>Embedding</h4>
                Der Embedding Layer ist immer der erste in einem Modell. Die konstanteste Leistungsverbesserung wurde durch diesen
                Layer erzeugt. Dieser Layer ist sehr gut für Netze geeignet, die auf Text bsieren. Dazu muss die Repräsentation
                des Texts als Integer vorliegen. Dies kann mit dem Tokenizer von Keras relisiert werden.
                Bei der Erzeugung werden zufällige Gewichte so trainiert, dass die Zusammenhänge des Texts abgebildet werden.
                Dadurch kann das Netz auf semantische Zusammenhänge achten und im folgenden Training verwenden.

                <h4>LSTM</h4>
                Dies ist der Short-Term Memory Layer. Dieser wird für RNN Netze verwendet und bietet eine gute Möglichkeit für rückwärtsgerichtete Netze.
                Die genaue Funktionsweise wurde in der Lehrveranstaltung vermittelt und der positive Effekt konnte in Versuchen bestätigt werden.

                <h4>Dense</h4>
                Der Dense Layer fügt die eigentlichen Gewichte in das Netz ein und enthält die eigentliche Berechnung.
                Die Größe wurde auf die gesamt Anzahl der Worte gesetzt.

                <h4>Activation</h4>
                Als Activation Layer wurde ein Softmax Layer verwendet.
                Dieser wandelt die Vektor Daten wieder zurück in Wahrscheinlichkeiten.

                <h2>Quellen</h2>
                <a href={"https://thecleverprogrammer.com/2020/07/20/next-word-prediction-model/"}>https://thecleverprogrammer.com/2020/07/20/next-word-prediction-model/</a>
                <a href={"https://www.tensorflow.org/api_docs/python/tf/keras/layers/"}>https://www.tensorflow.org/api_docs/python/tf/keras/layers/</a>
                <a href={"https://nextjs.org/"}>https://nextjs.org/</a>
                <a href={"https://github.com/rajveermalviya"}>https://github.com/rajveermalviya</a>
                <a href={"https://juan0001.github.io/next-word-prediction/"}>https://juan0001.github.io/next-word-prediction/</a>
                <a href={"https://medium.com/codait/bring-machine-learning-to-the-browser-with-tensorflow-js-part-iii-62d2b09b10a3"}>https://medium.com/codait/bring-machine-learning-to-the-browser-with-tensorflow-js-part-iii-62d2b09b10a3</a>

                <h2>Bekannte Fehler / Probleme</h2>
                Die beiden JSON Dateien beinhalten ein Mapping mit allen 8072 Worten. Leider hatte ich das Problem, dass manchmal
                die Javascript Heap Size überschritten wurde und das Modell nicht mehr gefunden werden konnte. Das habe ich
                versucht zu umgehen, indem ich vor jeder Vorhersage das Modell überprüfe und erneut lade. Aus einem Grund den ich bisher
                nicht gefunden habe, ist das jedoch nicht immer möglich. Ich vermute einen Zusammenhang mit Versel wo die App deployt wurde.
                Dann muss einmal der Browser gefresht werden.

                <br/><br/><br/>
            </div>
        </div>
    )
}