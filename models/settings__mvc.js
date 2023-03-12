const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const database = require('../database/database');

class Setting {
    constructor(firstName,middleName,lastName,email,
        password,username,code,id) {

        this.firstName = firstName,
        this.middleName = middleName,
        this.lastName = lastName,
        this.email = email,
        this.password = password,
        this.username = username,
        this.code = code

        if(id) {
            this.id = new ObjectId(id);
        }
        
    }

    async fetchProfileVal() {
        if(!this.id) {
            return;
        }

        const findProfile = await database.getDbFunc().collection('storedata').findOne({_id: this.id});
        this._id = findProfile._id;
        this.name = findProfile.name;
        this.username = findProfile.username;
        this.email = findProfile.email;
        this.password = findProfile.password;
        this.designation = findProfile.designation;
        this.code = findProfile.code;
        this.designation = findProfile.designation;
        this.photo = findProfile.photo;
    }

    async updateProfileData() {
        await database.getDbFunc().collection('storedata').updateOne({_id: this.id},{
            $set:{
                name:{
                    firstName: this.firstName,
                    middleName: this.middleName,
                    lastName: this.lastName,
                },
                email: this.email,
                password: this.password,
                username:this.username,
                code: this.code
            }
        });
    }

}

module.exports = Setting;