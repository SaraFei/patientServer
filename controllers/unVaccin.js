
import { patientModel } from "../model/patient.js";

const howManyVaccinated = async (req, res) => {
    let cnt = 0;
    try {
        let allPatients = await patientModel.find({});
        for (let i = 0; i < allPatients.length; i++) {
            if ( allPatients[i].receivingVaccineDate.length === 0) {
                cnt++;
            }
        }
        return res.json({ cnt });
    }
    catch (error) {
        res.status(400).send({ type: "get cnt error", message: "error accur when get cnt of not vaccinated " })
    }
}
export{howManyVaccinated};