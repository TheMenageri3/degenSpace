import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_PROD_URI as string);
mongoose.Promise = global.Promise;

const FlickAnalyticsSchema = new Schema({
  flickId: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  profileVisits: {
    type: Number,
    default: 0,
  },
  impressions: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.FlickAnalytics || mongoose.model("FlickAnalytics", FlickAnalyticsSchema);