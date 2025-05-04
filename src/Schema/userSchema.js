const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        minlength: [5, "At least 5 characters in name"],
        lowercase: true,
        trim: true,
        maxlength: [20, "At most 20 characters"],
    },

    lastname: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [5, "At least 5 characters in name"],
        lowercase: true,
        trim: true,
        maxlength: [20, "At most 20 characters"],
    },
    mobilenumber: {
        type: String,
        trim: true,
        unique: [true, "Phone should be unique"],
        required: [true, "Phone number is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email is already in use"],
        required: [true, "Email is required"],
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Email should be a valid email address"]
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
