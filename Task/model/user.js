import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const userSchema = new Schema(
    {
      
     file: {
         type: String,
     }
    },
    { timestamps: true }
  );

  
const User = model("User", userSchema);

export default User;