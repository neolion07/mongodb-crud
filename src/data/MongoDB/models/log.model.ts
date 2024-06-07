import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "A date for the log is required."]
    },
    weather: {
        type: mongoose.Types.ObjectId,
        ref: "Weather",
        required: [true, "A weather ID is required."]
    },
    location: {
        type: mongoose.Types.ObjectId,
        ref: "Location",
        required: [true, "A Location ID is required."]
    }
});

export const logModel = mongoose.model("Log", logSchema);