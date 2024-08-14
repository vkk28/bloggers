
import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService {
    client = new Client();
    account;

    constructor() {
       // console.log('Endpoint URL:', conf.appWriteUrl,conf.appWriteProjectId);
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        //console.log(this.account)
            
    }
    

    async createAccount({email, password, name}) {
        try {
            const id=ID.unique();
            const userAccount = await this.account.create(id,email, password, name);
            if (userAccount) {
              
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
           // console.log(this.account)
            
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService