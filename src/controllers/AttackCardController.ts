import { Request, Response } from 'express';
import prisma from '../client';

class AttackCardController {
  constructor() {
    this.createAttackCard = this.createAttackCard.bind(this);
    this.getAllAttackCards = this.getAllAttackCards.bind(this);
    this.getAttackCardById = this.getAttackCardById.bind(this);
    this.updateAttackCard = this.updateAttackCard.bind(this);
    this.deleteAttackCard = this.deleteAttackCard.bind(this);
  }

  public async createAttackCard(req: Request, res: Response) {
    try {
      const { name, damages, typeId } = req.body;
      const newAttackCard = await prisma.pokemonAttack.create({
        data: {
          name,
          damages,
          typeId,
        },
      });
      res.status(201).json(newAttackCard);
    } catch (error) {
      console.error('Error creating attack card:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async getAllAttackCards(req: Request, res: Response) {
    try {
      const allAttackCards = await prisma.pokemonAttack.findMany();
      res.status(200).json(allAttackCards);
    } catch (error) {
      console.error('Error getting all attack cards:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async getAttackCardById(req: Request, res: Response) {
    try {
      const { attackCardId } = req.params;
      const attackCard = await prisma.pokemonAttack.findUnique({
        where: { id: Number(attackCardId) },
      });
      if (attackCard) {
        res.status(200).json(attackCard);
      } else {
        res.status(404).send('AttackCard not found');
      }
    } catch (error) {
      console.error('Error getting attack card by ID:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async updateAttackCard(req: Request, res: Response) {
    try {
      const { attackCardId } = req.params;
      const { name, damages, typeId } = req.body;
      const updatedAttackCard = await prisma.pokemonAttack.update({
        where: { id: Number(attackCardId) },
        data: {
          name,
          damages,
          typeId,
        },
      });
      res.status(200).json(updatedAttackCard);
    } catch (error) {
      console.error('Error updating attack card:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async deleteAttackCard(req: Request, res: Response) {
    try {
      const { attackCardId } = req.params;
      await prisma.pokemonAttack.delete({
        where: { id: Number(attackCardId) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting attack card:', error);
      res.status(500).send('Internal server error');
    }
  }
}

export default new AttackCardController();
