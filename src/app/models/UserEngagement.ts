import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_PROD_URI as string);
mongoose.Promise = global.Promise;

const UserEngagementSchema = new Schema({
  flickId: {
    type: String,
    required: true,
    unique: true,
  },
  hasRespected: {
    type: Boolean,
    default: false,
  },
  hasCloned: {
    type: Boolean,
    default: false,
  },
  hasDumped: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.UserEngagement || mongoose.model("UserEngagement", UserEngagementSchema);