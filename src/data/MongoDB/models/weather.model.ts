import mongoose from 'mongoose'

const weatherSchema = new mongoose.Schema({
	precipitationType:{
        type: String,
        // Rain, snow, none, etc.
        required: [true, 'Precipitation type required.']
    },
    temperatureInCelsius:{
        type: Number,
        required: false,
        default: 25
    },
    sky:{
        type: String,
        // clear, cloudy, etc.
        required: false
    },
    windSpeedInKmh:{
        type: Number,
        required: false,
        default: 0
    },
    windDirection:{
        type: String,
        required: false
    }
})

export const weatherModel = mongoose.model('Weather', weatherSchema);
