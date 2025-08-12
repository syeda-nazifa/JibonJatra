import express from "express";
import bcrypt from "bcrypt";
import jwt from Json
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//Register 

router.post("/register", async (req, res)=>{
    const { name, email, password} = req.body;
    if (!name || !email || !password)
        return res.status(400).json({message: "All fields Required"});

    try{
        if (await User.findOne({ email }))
            return res.status(400).json({message: "Email in Use!!"});
        
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1hr"});
        res.status(201).json({ token });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

//Login 

router.post("/login", async ( req, res ) => {
    const {email, password} = req.body;
    if ( !email || !password )
        return res.status(400).json({message: "All fields are requied"});

    try{
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({message: "Email not Valid"});

        const pass = await bcrypt.compare(password, user.password);
        if (!pass)
            return res.status(400).json({message: "Wrong Password!!"});

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1hr"});
        res.status(201).json({ token });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

export default router;