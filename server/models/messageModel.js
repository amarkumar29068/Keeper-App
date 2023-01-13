const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  { userId: String,
    title: { type: String, required: true },
    description: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);