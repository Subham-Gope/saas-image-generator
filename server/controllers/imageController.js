import axios from "axios";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Mising Details" });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Making API call to Hugging Face

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Conver the binary data into a Buffer
    const imageBuffer = Buffer.from(response.data, "binary");

    // convert the Buffer into a base64 string
    const base64Image = imageBuffer.toString("base64");

    // Create a data URL (base64 image) to send back to the client
    const imageUrl = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
