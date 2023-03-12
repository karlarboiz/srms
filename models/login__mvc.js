const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const database = require('../database/database');

class Login {
    constructor(id) {
        this.id = new ObjectId(id)
    }

    static async fetchDesignationInfo(){
        const designation = await database.getDbFunc().collection('designation').find().toArray()
        return designation;
    }

    static async fetchStoreData(){
        const storedata= await database.getDbFunc().collection('storedata').find().toArray();
        return storedata;
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

    async fetchProfileVal() {
        if(!this.id) {
            return;
        }

        const userData = await database.getDbFunc().collection('storedata').findOne({
        _id: this.id
    });

        this.designation = userData.designation;

    }
}

module.exports = Login;