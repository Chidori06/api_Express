import type { Request, Response } from "express";
import usersService from "../services/users.service.ts";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const getUserById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await usersService.getOneUser(id);
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const { lastname, firstname, email, password, roleId, } = req.body;
        const user = await usersService.createAUser(
            lastname,
            firstname,
            email,
            password,
            Number(roleId)
        );
        res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await usersService.updateAUser(id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await usersService.deleteAUser(id);
        res.status(204).send();
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
