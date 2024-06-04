import { Router } from "express";
import Card from "../models/Card.js";
import User from "../models/User.js";

const router = Router()

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    
    const cards = await Card.find({ userId });

    if (!cards) {
        return res.status(404).json({ message: "Nenhum cartão encontrado. Tente adicionar um" })
    }

    res.status(200).json({ cards })
})

// router.get("/", async (req, res) => {
//     const card = await Card.find()

//     if (!card) {
//         return res.status(404).json({ message: "Nenhum cartão encontrado. Tente adicionar um" })
//     }

//     res.status(200).json({ card })
// })

router.post("/", async (req, res) => {
    const { number, date, name, cvv, userId } = req.body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        const card = new Card({
            number,
            date,
            name,
            cvv,
            userId: user._id
        });

        await card.save()
        res.status(201).json({ message: 'Cartão adicionado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: "Houve um erro ao adicionar seu cartão. Tente novamente mais tarde" })
    }
    
})

export default router