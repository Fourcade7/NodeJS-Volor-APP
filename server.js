const express = require("express");
const cors = require("cors");


const authRoutes = require("../BeelineUz/src/routes/AuthRoutes");
const plansRoutes = require("../BeelineUz/src/routes/PlanRoutes");
const smsRoutes = require("../BeelineUz/src/routes/SmsRoutes");
const gbRoutes = require("../BeelineUz/src/routes/GbRoutes");
const phoneRoutes = require("../BeelineUz/src/routes/PhoneRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/plan", plansRoutes);
app.use("/sms", smsRoutes);
app.use("/gb", gbRoutes);
app.use("/phone", phoneRoutes);

app.get("/pr",(req,res)=>{
  res.send({m:"pr"});
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
