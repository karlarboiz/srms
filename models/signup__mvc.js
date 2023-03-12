const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const database = require('../database/database');

class Signup {
    constructor(firstName,middleName,lastName,username,
        email,password,designation,code,photo,id) {
        this.firstName = firstName,
        this.middleName = middleName,
        this.lastName = lastName,
        this.username = username,
        this.email = email,
        this.password = password,
        this.designation = designation,
        this.code = code,
        this.photo = photo

        if(id) {
            this.id = new ObjectId(id)
        }
    }

    static async fetchDesignationInfo(){
        const designation = await database.getDbFunc().collection('designation').find().toArray()
        return designation;
    }

    static async fetchStoreData(){
        const storedata= await database.getDbFunc().collection('storedata').find().toArray();
        return storedata;
    }

    static async fetchRegisteredUsers(){
        const registeredUsers = await database.getDbFunc().collection('registeredusers').find().toArray();
        return registeredUsers;
    }

    async fetchDesignationVal() {
        if(!this.id) {
            return;
        }

        const designationData = await database.getDbFunc().collection('designation').findOne({
        _id: this.id
    });

        this.position = designationData.position

    }

    async saveUser() {
        await database.getDbFunc().collection('storedata').insertOne({
            name: {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName
            },
            username: this.username,
            email: this.email,
            password: this.password,
            designation:this.designation,
            code:this.code,
            photo: this.photo
        });
    }
}

module.exports = Signup;