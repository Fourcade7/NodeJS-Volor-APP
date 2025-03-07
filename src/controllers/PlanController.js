const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



class PlanController{


    async add(req,res){
        const {name,description,gb,sms,minute,price} = req.body;

        try{
            const plan= await prisma.plans.create({
                data:{name,description,gb,sms,minute,price}
            });
            res.status(201).send({message:"New Plan added",plan});

        }catch(error){
            res.status(400).send({ message: error.message });
        }

    }
    async getAll(req,res){
        const plans=await prisma.plans.findMany();
        res.send(plans);
    }
    async getById(req,res){
        const id=Number(req.params.id);
        try{
            const plan=await prisma.plans.findUnique({where:{id}});
            if(!plan) return res.status(404).json({error:"Plan not found"});
            res.send(plan);
          }catch(error){
            res.status(500).json({ error: "Something went wrong" });
          }
    }
    async update(req,res){
        const id=Number(req.params.id);
        const { name,description,gb,sms,minute,price} = req.body;
        try{
          const plan=await prisma.plans.update({
            where:{id},
            data:{name,description,gb,sms,minute,price}
          });
          
          res.send(plan);
        }catch(error){
          res.status(404).json({ error: "Plan not found" });
        }
    }

    async delete(req,res){
        const id=Number(req.params.id);
   
    try{
      await prisma.plans.delete({where:{id}});
      
      res.send({message:"Plan deleted"});
    }catch(error){
      res.status(404).json({ error: "Plan not found" });
    }
    }

}

module.exports=new PlanController();