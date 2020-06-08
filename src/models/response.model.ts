import { Service } from './service.model';

export interface Response {
    status: string;
    message?: string;
    token?: string;
    services?: Array<Service>;
    favoriteServices?: Array<Service>;
}