import {getRepository, MoreThan} from "typeorm";
import {Request, Response} from "express";
import {Url} from "../entity/Url";
import API_URL from '../config'

export const getUrls = async (_req: Request, res: Response) => {
    try {
        const urls = await getRepository(Url).find();
        return res.json(urls);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const shortener = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        let alreadyExists: Url | null, short_url: string = null;

        const expires_at = new Date();
        expires_at.setDate(expires_at.getDate() + 1);
        
        do {
            const length: number = Math.random() * (10 - 5) + 5;
            short_url = Math.random().toString(36).replace(/[^a-z-0-9]+/g, '').substr(0, length);
    
            alreadyExists = await getRepository(Url).findOne({short_url})
        } while (alreadyExists);

        await getRepository(Url).save({url, short_url, expires_at});
        return res.json({newUrl: API_URL + short_url});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const redirect = async (req: Request, res: Response) => {
    try {
        const { short_url } = req.params
        const result = await getRepository(Url).findOne({short_url, expires_at: MoreThan(new Date())});
        if(result){
            return res.json({url: result.url});
        }

        return res.status(404).json({error: 'url not found'});
    } catch (error) {
        return res.status(500).json(error);
    }
}