import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, "The city is required."]
    },
    state: {
        type: String,
        required: false
    }
});

export const locationModel = mongoose.model('Location', locationSchema);
