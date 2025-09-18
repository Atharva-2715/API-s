const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = 3000;

/*CURRENCY_API=fxr_live_91719d34df3a699f1a24060e27d851ab482e */
app.get("/", (req, res) => {
  res.send("Currency Converter API is running");
});

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res
      .status(400)
      .json({ error: "from, to and amount parameters are required" });
  }

  try {
    const apiKey = process.env.CURRENCY_API; // <-- make sure this matches your .env file

    const response = await axios.get("https://api.fxratesapi.com/convert", {
        params: {
          from,
          to,
          amount,
          format: "json"   // ✅ lowercase json
        },
        headers: {
          Authorization: `Bearer ${process.env.CURRENCY_API}`,
          Accept: "application/json" 
        }
      });
      

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
