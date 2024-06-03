import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/User.js";
import checkToken from "../utils/checkToken.js";

const router = Router()

router.get("/:id", checkToken, async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
    }

    res.status(200).json({ user })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const userExists = await User.findOne({ email })

    if (!userExists) {
        return res.status(422).json({ message: "Usuário ou senha invalidos. Tente novamente" })
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if (!checkPassword) {
        return res.status(422).json({ message: "Usuário ou senha invalidos. Tente novamente" })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: userExists._id }, secret)

        res.status(200).json({ message: "Usuário logado com sucesso", token })
    } catch (error) {
        res.status(500).json({ message: "Houve um erro ao acessar. Tente novamente mais tarde" })
    }
})

router.post("/register", async (req, res) => {
    const { email, name, balance, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(422).json({ message: "Esse endereço de email já cadastrado" })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        email, 
        name, 
        balance,
        password: passwordHash
    })

    try {
        await user.save()

        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id }, secret)

        res.status(201).json({ message: 'Usuário criado com sucesso!', token })
    } catch (error) {
        res.status(500).json({ message: "Houve um erro ao registrar o usuário. Tente novamente mais tarde" })
    }
    
})

export default router