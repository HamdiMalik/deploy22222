const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');

async function predictClassification(model, image) {
    try {

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const label = confidenceScore <= 50 ? 'Non-cancer' : 'Cancer'; 
        let suggestion;

        if(label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }

        if(label === 'Non-cancer') {
            suggestion = "Penyakit kanker tidak terdeteksi.";
        }

        const response = {
            status: "success",
            message: "Model is predicted successfully",
            data: {
                id: uuidv4(),
                result: label,
                suggestion: suggestion,
                createdAt: new Date().toISOString()
            }
        };

        return response;

    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
    }
}

module.exports = predictClassification;