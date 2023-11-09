import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "uam-bank",
});

import {onRequest, HttpsError} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2/options";
import {_deposit} from "./admin/deposit";
import { _withdraw } from "./admin/withdraw";
import { _transfer } from './admin/transfer';
import { _handleLoanRequested } from './admin/loan';

setGlobalOptions({maxInstances: 10});

// o handleDeposit precisa de dados {value: number, userUid: string} no body;
// o handleDeposit retorna {resultType: 'success' | 'error', resultMessage: string} como resposta;
exports.handleDeposit = onRequest(async (req, res) => {
  if (req.method !== "POST" ||
      Object.keys(req.body.data).length === 0 ||
      Object.keys(req.body).length === 0) {
    res.status(400).send(({resultType: 'error', resultMessage: "Change the request method to POST"}));
    return;
  }
  if (!("data" in req.body) ||
  !("value" in req.body.data) ||
  !("userUid" in req.body.data)) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }

  try {
    const result: {resultType: 'success' | 'error', resultMessage: string} = 
      await _deposit({userUid: req.body.data.userUid, value: req.body.data.value});
    res.json({data: result});
  } catch (error) {
    const errorFirebase = error as HttpsError;
    res.status(Number(errorFirebase.code)).send(({resultType: 'error', resultMessage: errorFirebase.message}));
  }
});

// o handleWithdraw precisa de dados {value: number, userUid: string} no body;
// o handleWithdraw retorna {resultType: 'success' | 'error', resultMessage: string} como resposta;
exports.handleWithdraw = onRequest(async (req, res) => {
  if (req.method !== "POST" ||
      Object.keys(req.body.data).length === 0 ||
      Object.keys(req.body).length === 0) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }
  if (!("data" in req.body) ||
  !("value" in req.body.data) ||
  !("userUid" in req.body.data)) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }

  try {
    const result: {resultType: 'success' | 'error', resultMessage: string} = 
      await _withdraw({userUid: req.body.data.userUid, value: req.body.data.value});
    res.json({data: result});
  } catch (error) {
    const errorFirebase = error as HttpsError;
    res.status(Number(errorFirebase.code)).send(({resultType: 'error', resultMessage: errorFirebase.message}));
  }
});

// o handleTransfer precisa de dados {value: number, userUid: string, account: string, agency} no body;
// o handleTransfer retorna {resultType: 'success' | 'error', resultMessage: string} como resposta;
exports.handleTransfer = onRequest(async (req, res) => {
  if (req.method !== "POST" ||
      Object.keys(req.body.data).length === 0 ||
      Object.keys(req.body).length === 0) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }
  if (!("data" in req.body) ||
  !("value" in req.body.data) ||
  !("userUid" in req.body.data) ||
  !("account" in req.body.data) ||
  !("agency" in req.body.data)) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }

  try {
    const result: {resultType: 'success' | 'error', resultMessage: string} = 
      await _transfer({userUid: req.body.data.userUid, value: req.body.data.value, account: req.body.data.account, agency: req.body.data.agency});
    res.json({data: result});
  } catch (error) {
    const errorFirebase = error as HttpsError;
    res.status(Number(errorFirebase.code)).send(({resultType: 'error', resultMessage: errorFirebase.message}));
  }
});

// o handleLoanRequested precisa de dados {userUid: string, value: number} no body;
// o handleLoanRequested retorna {resultType: 'success' | 'error', resultMessage: string} como resposta;
exports.handleLoanRequested = onRequest(async (req, res) => {
  if (req.method !== "POST" ||
      Object.keys(req.body.data).length === 0 ||
      Object.keys(req.body).length === 0) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }
  if (!("data" in req.body) ||
  !("value" in req.body.data) ||
  !("userUid" in req.body.data)) {
    res.status(400).send(({resultType: 'error', resultMessage: "No data provided"}));
    return;
  }

  try {
    const result: {resultType: 'success' | 'error', resultMessage: string} = 
      await _handleLoanRequested({userUid: req.body.data.userUid, value: req.body.data.value});
    res.json({data: result});
  } catch (error) {
    const errorFirebase = error as HttpsError;
    res.status(Number(errorFirebase.code)).send(({resultType: 'error', resultMessage: errorFirebase.message}));
  }
});

