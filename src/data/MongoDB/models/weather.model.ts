import mongoose from 'mongoose'

const weatherSchema = new mongoose.Schema({
    date:{
        type: Date,
        require: [true, 'Date required.']
    },
    temperatureInCelsius:{
        type: Number,
        require: [true, 'Temperature required.']
    },
    sky:{
        type: String
    },
    windSpeed:{
        type: Number
    },
    windDirection:{
        type: Number
    },
    precipitationType:{
        type: Number
        // Rain, snow, none, etc.
    }
})

export const weatherModel = mongoose.model('Weather', weatherSchema);