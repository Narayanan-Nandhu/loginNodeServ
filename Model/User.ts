import mongoose, { Schema } from "mongoose";

const UserSchema =  new Schema({
    name: {
        type: 'String',
        required: true,
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

const User = mongoose.model('Users', UserSchema);

export default User;
