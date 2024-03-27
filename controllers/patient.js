import mongoose from "mongoose";
import { patientModel, patientUpdateValidator, patientValidator } from "../model/patient.js";

//Allows get all the patient optinol with search string. and limit the amount of the patient
//per page
const getAllPatients = async (req, res) => {

    let { limit = 6, search, page = 1 } = req.query;
    let expressionToSearch = RegExp(`${search}`);
    try {
        let filter = {};
        if (search) {
            filter.name = expressionToSearch;
        }
        const allPatient = await patientModel.find(filter).limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        // const allPatient = await patientModel.find(filter);
        console.log(allPatient);
        res.json(allPatient);
        //מה זו השורה הזו??????
        return allPatient;
    }
    catch (err) {
        res.status(400).send({ type: "get patient error", message: "התרחשה שגיאה בעת הבאת הפציינטים מהשרת" })
    }
}
//Allows  to search for a patient by their ID card
const getPatientById = async (req, res) => {
    let { id } = req.params;
    try {
        let patientById = await patientModel.findOne({ id: id });
        if (!patientById) {
            return res.status(404).send({ type: "patient error", message: "didnt found patient with such id" })
        }
        return res.json(patientById);
    }
    catch (err) {
        res.status(400).send({ type: "get patient by id error", message: "התרחשה שגיאה בעת הבאת הפציינט מהשרת" })
    }
}

//Add patient to out DB
const addPatient = async (req, res) => {

    let { firstName, lastName, id, dob, address, telephonNum, phonNum, receivingVaccineDate, positiveDate, recoveryDate } = req.body;
    let validate = patientValidator(req.body);
    if (validate.error) {
        return res.status(403).json({ type: "error validate", message: validate.error.details[0].message })
    }

    if (!positiveDate && recoveryDate) {
        return res.status(409).json({ type: "conflict", message: "לא יתכן להכניס תאריך החלמה ללא תאריך חיובי מהנגיף" })
    }
    try {

        let samePatient = await patientModel.findOne({ id: id });
        if (samePatient) {
            return res.status(409).json({ type: "same patient", message: "there is a patient with such id" })
        }
        let newPatient = new patientModel({ firstName, lastName, id, dob, address, telephonNum, phonNum, receivingVaccineDate, positiveDate, recoveryDate });
        await newPatient.save();
        res.json(newPatient);
    }
    catch (err) {
        res.json(err);
    }
}

//Up date the patient details
const updatePatient = async (req, res) => {
    let { id } = req.params;
    try {

        // if(!positiveDate&&recoveryDate){
        //     return res.status(409).json({type:"conflict",message:"לא יתכן להכניס תאריך החלמה ללא תאריך חיובי מהנגיף"})
        // }

        let validate = patientUpdateValidator(req.body);
        if (validate.error) {
            return res.status(403).json({ type: "error validate", message: validate.error.details[0].message })
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ type: "error id", message: "id is not valied" });
        }

        let patientToUpdate = await patientModel.findById(id);
        if (!patientToUpdate) {
            return res.status(404).send({ type: "patient error", message: "didnt found patient with such id" })
        }
        patientToUpdate = await patientModel.findByIdAndUpdate(id, req.body);
        let updatePatient = await patientModel.findById(id)
        res.json(updatePatient);
        console.log("update", updatePatient.id);
        console.log(updatePatient);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

//Delete a patient from our DB
const deletePatient = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ type: "error id", message: "id is not valied" });
        }
        let patientToDelete = await patientModel.findById(id);
        if (!patientToDelete) {
            return res.status(404).send({ type: "patient error", message: "didnt found patient with such id" })
        }
        patientToDelete = await patientModel.findByIdAndDelete(id);
        console.log("deleted", patientToDelete.id)
        res.json(patientToDelete);

    }
    catch (err) {
        res.status(400).send(err);
    }
}

export { getAllPatients, addPatient, updatePatient, deletePatient, getPatientById };