import { Request, Response } from 'express';
import prisma from '../client';
const bcrypt = require('bcrypt');

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
            where: { email },
        });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json(user);
        } else {
            res.status(401).send('Invalid email or password');
        }
        } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
        }
    }
}

export default UserController;