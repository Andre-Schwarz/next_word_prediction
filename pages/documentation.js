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
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>

            <TableContainer component={Paper} className={utilStyles.table}>
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

        </Layout>
    )
}