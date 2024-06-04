import { Router } from "express";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const router = Router()

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    
    const transactions = await Transaction.find({ userId }).populate('userId', 'email name');

    if (!transactions) {
        return res.status(404).json({ message: "Nenhum transação encontrada. Tente adicionar uma" })
    }

    res.status(200).json({ transactions })
})

router.post("/", async (req, res) => {
    const { type, description, value, date, userId } = req.body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        const transaction = new Transaction({
            type, 
            description, 
            value,
            date,
            userId: user._id
        })

        const newBalanceValue = type === "Depósito" ? user.balance + value : user.balance - value

        await transaction.save()
        await User.updateOne(user, { $set: { balance: newBalanceValue } })
        res.status(201).json({ message: 'Transação adicionada com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: "Houve um erro ao adicionar a transação. Tente novamente mais tarde" })
    }
    
})

export default router