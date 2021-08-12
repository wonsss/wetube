import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.pre("save", async function () {
  console.log("🚀 ~ file: Video.js ~ line 16 ~ this.hashtags", this.hashtags);
  console.log(
    "🚀 ~ file: Video.js ~ line 16 ~ this.hashtags.join()",
    this.hashtags.join()
  );
  // this.hashtags = this.hashtags
  //   .join()
  //   .split(",")
  //   .map((word) => word.trim())
  //   .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
