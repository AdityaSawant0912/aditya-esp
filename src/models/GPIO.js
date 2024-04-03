import { Schema, model, models } from 'mongoose'

const GPIOsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        unique: true,
    },
    state: {
        type: String,
        required: true,
    },
})

module.exports = models.GPIO || model('GPIO', GPIOsSchema)
