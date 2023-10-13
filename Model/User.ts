import mongoose, { Schema } from "mongoose";

const UserSchema =  new Schema({
    name: {
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
    },
    googleId: {
        type: 'String'
    },
    profileImage: {
        type: 'String',
    },
    Gender: {
        type: 'String'
    }
});

const User = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default User;
