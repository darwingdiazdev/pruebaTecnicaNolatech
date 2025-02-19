const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Almacena el hash
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: String, enum: ["Admin", "Manager", "Employee"], required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.password; // Eliminar la contraseña antes de enviar respuesta
        delete ret._id;
    }
});

module.exports = mongoose.model('User', userSchema);
