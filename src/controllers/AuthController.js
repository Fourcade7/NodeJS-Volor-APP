const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

class AuthController {
  async register(req, res) {
    const planName2 = "Simple";
    const gb2 = "50";
    const sms2 = "500";
    const minute2 = "1000";
    const price2 = "70000";
    const pgb = "0";
    const psms = "0";
    const pminute = "0";


    const { username, lastname, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await prisma.user.findUnique({
        where: { phone },
      });

      if (existingUser) {
        return res
          .status(400)
          .send({ message: "Phone number already registered" });
      }
      const user = await prisma.user.create({
        data: {
          username,
          lastname,
          phone,
          password: hashedPassword,
          planName: planName2,
          gb: gb2,
          sms: sms2,
          minute: minute2,
          price: price2,
          pgb,
          psms,
          pminute
        },
      });
      res.status(201).send({ message: "User Registered ", user });
    } catch (error) {
      res.status(400).send({ message: error.message });
      
    }
  }

  async login(req, res) {
    const { phone, password } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Telefon raqam yoki parol xato" });
    }

    const token = jwt.sign({ userId: user.id }, "secretkey", {
      expiresIn: "30d",
    });
    //res.send({ message: "Login succesful", token });
    res.send(user);
  }

  async getAll(req, res) {
    const users = await prisma.user.findMany();
    res.send(users);
  }

  async getById(req,res){
    const id=Number(req.params.id);

    try{
      const user=await prisma.user.findUnique({where:{id}});
      if(!user) return res.status(404).json({error:"User not found"});
      res.send(user);
    }catch(error){
      res.status(500).json({ error: "Something went wrong" });
    }

  }

  async getByPhone(req,res){
    const phone=req.params.phone;

    try{
      const ph=await prisma.user.findUnique({where:{phone}});
      if(!ph) return res.status(404).json({error:"User not found"});
      res.send(ph);
    }catch(error){
      res.status(500).json({ error: error.message });
    }

  }


  async update(req,res){
    const id=Number(req.params.id);
    const { username,lastname,phone,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
      const user=await prisma.user.update({
        where:{id},
        data:{username,lastname,phone,password:hashedPassword}
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }


  

  async delete(req,res){
    const id=Number(req.params.id);
   
    try{
      await prisma.user.delete({where:{id}});
      
      res.send({message:"User deleted"});
    }catch(error){
      res.status(404).json({ error: "User not found" });
    }

  }




  async updateFull(req,res){
    const id=Number(req.params.id);
    const { username,lastname,phone,password,planName,gb,sms,minute,price} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //const isMatch = await bcrypt.compare(password, hashedPassword); true or false


    try{
      const user=await prisma.user.update({
        where:{id},
        data:{username,lastname,phone,password:hashedPassword,planName,gb,sms,minute,price}
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }


  async updatePlan(req,res){
    const id=Number(req.params.id);
    const {planName,gb,sms,minute,price} = req.body;
    

    try{
      const user=await prisma.user.update({
        where:{id},
        data:{planName,gb,sms,minute,price}
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }

  async updatePhone(req,res){
    const id=Number(req.params.id);
    const {phone} = req.body;
    

    try{
      const user=await prisma.user.update({
        where:{id},
        data:{phone}
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }

  async updateGb(req,res){
    const id=Number(req.params.id);
    const {pgb} = req.body;
    

    try{
      const user=await prisma.user.update({
        where:{id},
        data:{pgb:pgb}
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }

  async updateSms(req,res){
    const id=Number(req.params.id);
    const {psms} = req.body;
    

    try{
      const user=await prisma.user.update({
        where:{id},
        data:req.body
      });
      
      res.send(user);
    }catch(error){
      res.status(404).json({ error: `${error.message}` });
    }

  }


  


}

module.exports = new AuthController();
