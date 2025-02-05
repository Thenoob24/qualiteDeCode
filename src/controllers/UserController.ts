import { Request, Response } from 'express';
import prisma from '../client';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController
{
    constructor() 
    {
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    
    public async createUser(req: Request, res: Response) 
    {
        try {
        const { name, email, password } = req.body;
        console.log('Request body:', req.body);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
            email,
            password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
        } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
        }
    }
    
    public async loginUser(req: Request, res: Response) 
    {
        try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
            email,
            },
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send('Invalid password');
            return;
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
        } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
        }
    }
}

export default UserController;