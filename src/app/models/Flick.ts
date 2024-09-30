import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_PROD_URI as string);
mongoose.Promise = global.Promise;

const FlickSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  flickType: {
    type: String,
    enum: ['ReFlick', 'PrimaryFlick'],
    default: 'ReFlick',
  },
  parentFlickId: {
    type: String,
    unique: true,
    sparse: true,
  },
  flickData: {
    type: String,
    required: true,
  },
  respectCount: {
    type: Number,
    default: 0,
  },
  cloneCount: {
    type: Number,
    default: 0,
  },
  dumpCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Flick || mongoose.model("Flick", FlickSchema);