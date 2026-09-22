import type { Request, Response } from "express";
import rolesService from "../services/roles.service.ts";

const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rolesService.getAllRoles();
        return res.status(200).json(roles);

    }
    catch (error) {
        return res.status(500).json(error);
    }

};

const getRoleById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const role = await rolesService.getOneRole(id);

        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createRole = async (req: Request, res: Response,) => {
    try {
        const { label } = req.body;

        const role = await rolesService.createARole(
            label
        );

        return res.status(201).json(role);
    } catch (error) {
        return res.status(500).json(error);
    }
};


const updateRole = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const role = await rolesService.updateARole(
            id,
            req.body
        );

        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteRole = async (req: Request, res: Response,) => {
    try {
        const id = Number(req.params.id);

        await rolesService.deleteARole(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}