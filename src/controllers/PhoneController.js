const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



class PhoneController{


    async add(req,res){
        const {number,price} = req.body;

        try{
            const phonep= await prisma.phone.create({
                data:{number,price}
            });
            res.status(201).send({message:"New Phone added",phonep});

        }catch(error){
            res.status(400).send({ message: error.message });
        }

    }
    async getAll(req,res){
        const packages=await prisma.phone.findMany();
        res.send(packages);
    }
    async getById(req,res){
        const id=Number(req.params.id);
        try{
            const phone=await prisma.phone.findUnique({where:{id}});
            if(!phone) return res.status(404).json({error:"phone not found"});
            res.send(phone);
          }catch(error){
            res.status(500).json({ error: "Something went wrong" });
          }
    }
    async update(req,res){
        const id=Number(req.params.id);
        const { number,price} = req.body;
        try{
          const numberpackage=await prisma.phone.update({
            where:{id},
            data:{number,price}
          });
          
          res.send(numberpackage);
        }catch(error){
          res.status(404).json({ error: "Phone not found" });
        }
    }

    async delete(req,res){
        const id=Number(req.params.id);
   
    try{
      await prisma.phone.delete({where:{id}});
      
      res.send({message:"phone deleted"});
    }catch(error){
      res.status(404).json({ error: "phone not found" });
    }
    }

}

module.exports=new PhoneController();