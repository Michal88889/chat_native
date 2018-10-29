import { ApiConfig } from "../models";

export class Config {
    static api: ApiConfig = {
        url: '',
        headers: {
            'REQUEST-KEY': '',
            'REQUEST-TOKEN': ''
        }
    };
}