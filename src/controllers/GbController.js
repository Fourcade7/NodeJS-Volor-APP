const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



class GbController{


    async add(req,res){
        const {gb,ussd,price} = req.body;

        try{
            const gbp= await prisma.gb.create({
                data:{gb,ussd,price}
            });
            res.status(201).send({message:"New Gb added",gbp});

        }catch(error){
            res.status(400).send({ message: error.message });
        }

    }
    async getAll(req,res){
        const packages=await prisma.gb.findMany();
        res.send(packages);
    }
    async getById(req,res){
        const id=Number(req.params.id);
        try{
            const gb=await prisma.sms.findUnique({where:{id}});
            if(!gb) return res.status(404).json({error:"gb not found"});
            res.send(gb);
          }catch(error){
            res.status(500).json({ error: "Something went wrong" });
          }
    }
    async update(req,res){
        const id=Number(req.params.id);
        const { gb,ussd,price} = req.body;
        try{
          const gbpackage=await prisma.gb.update({
            where:{id},
            data:{gb,ussd,price}
          });
          
          res.send(gbpackage);
        }catch(error){
          res.status(404).json({ error: "gb not found" });
        }
    }

    async delete(req,res){
        const id=Number(req.params.id);
   
    try{
      await prisma.gb.delete({where:{id}});
      
      res.send({message:"gb deleted"});
    }catch(error){
      res.status(404).json({ error: "gb not found" });
    }
    }

}

module.exports=new GbController();