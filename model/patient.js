import mongoose from "mongoose";
import Joi from "joi";

const addressPatient = mongoose.Schema({
    city: String,
    street: String,
    houseNum: Number
})

const patientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    id: String,
    address: addressPatient,
    telephonNum: String,
    phonNum: String,
    receivingVaccineDate: [{ date: Date, manufacturer: String }],
    positiveDate: Date,
    recoveryDate: Date,
    //האם לעשות את הכתובת אובייקט רגיך
    //try:{l:String,m:String,d:Number}

})
export const patientModel = mongoose.model("patients", patientSchema);
export const patientValidator = (patient) => {
    const schema = Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).required(),
        lastName:Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).required(),
        id: Joi.string().pattern(/^[0-9]{9}$/).min(9).max(9).required(),
        address: Joi.object({
            city: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).min(3).max(15).required(),
            street: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).min(3).max(15).required(),
            houseNum: Joi.number().min(1).max(200).required()
        }),
        telephonNum:  Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/).required(),
        phonNum: Joi.string().pattern(/^[0-9]{10}$/).min(10).max(10).required(),
        //לבדוק האם ככה זה נכון
        receivingVaccineDate: Joi.array().items(
            Joi.object({
                date: Joi.date().less('now').required(),
                manufacturer: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).required()
            })
        ).max(4).required(),
        positiveDate: Joi.date().required(),
        recoveryDate: Joi.date().less('now')
    })
    return schema.validate(patient);

}
export const addressPatientValidator = (address) => {
    const schema = Joi.object({
        city: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).min(3).max(15).required(),
        street: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).min(3).max(15).required(),
        houseNum: Joi.number().min(1).max(200).required()
    })
    return schema.validate(address);
}

//edit
export const patientUpdateValidator = (patientToUpdate) => {
    const schema = Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/),
       lastName: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/),
       
        //טעון בדיקה
        address:  Joi.object({
            city: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).min(3).max(15),
            street: Joi.string().pattern(/^[A-Za-zא-ת\s]+$/).min(3).max(15),
            houseNum: Joi.number().min(1).max(200)
        }),
        telephonNum:  Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/),
        phonNum: Joi.string().pattern(/^[0-9]{10}$/).min(10).max(10),
        //לבדוק האם ככה זה נכון
        receivingVaccineDate: Joi.array().items(
            Joi.object({
                date: Joi.date().less('now'),
                manufacturer: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/))
            })
        ).max(4),
        positiveDate: Joi.date(),
        recoveryDate: Joi.date().less('now')
    })
    return schema.validate(patientToUpdate);

}

export const addressUpdatePatientValidator = (addressToUpdate) => {
    const schema = Joi.object({
        city: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).min(3).max(10),
        street: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).min(3).max(15),
        houseNum: Joi.number().min(1).max(200)
    })
    return schema.validate(addressToUpdate);
}