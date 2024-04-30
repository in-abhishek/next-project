const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   name  :String,
   email: String,
   status:Boolean
});


export default mongoose.models.registerSchema || mongoose.model("userFormValues", registerSchema);