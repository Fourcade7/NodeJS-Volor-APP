const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



class SmsController{


    async add(req,res){
        const {sms,ussd,price} = req.body;

        try{
            const smsp= await prisma.sms.create({
                data:{sms,ussd,price}
            });
            res.status(201).send({message:"New Sms added",smsp});

        }catch(error){
            res.status(400).send({ message: error.message });
        }

    }
    async getAll(req,res){
        const packages=await prisma.sms.findMany();
        res.send(packages);
    }
    async getById(req,res){
        const id=Number(req.params.id);
        try{
            const sms=await prisma.sms.findUnique({where:{id}});
            if(!sms) return res.status(404).json({error:"sms not found"});
            res.send(sms);
          }catch(error){
            res.status(500).json({ error: "Something went wrong" });
          }
    }
    async update(req,res){
        const id=Number(req.params.id);
        const { sms,ussd,price} = req.body;
        try{
          const smspackage=await prisma.sms.update({
            where:{id},
            data:{sms,ussd,price}
          });
          
          res.send(smspackage);
        }catch(error){
          res.status(404).json({ error: "sms not found" });
        }
    }

    async delete(req,res){
        const id=Number(req.params.id);
   
    try{
      await prisma.sms.delete({where:{id}});
      
      res.send({message:"sms deleted"});
    }catch(error){
      res.status(404).json({ error: "sms not found" });
    }
    }

}

module.exports=new SmsController();