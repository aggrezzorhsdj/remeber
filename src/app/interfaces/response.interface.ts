import {ITodos} from './todos.interface';
export interface IResponse {
    status: string;
    message: string;
    data?: ITodos[];
}
