
const database = require('../database/database');

class CreateSubjects {
    constructor(subjectName,subjectLabel,specID) {
        this.subjectName = subjectName,
        this.subjectLabel = subjectLabel,
        this.specID = specID

    }
    async fetchExistingCreatedSubject() {

        if(!this.specID) {
            return;
        }

        const createdSubjectDoc =  await database.getDbFunc().collection('subjects').findOne({subjectName: this.specID});

        if(!createdSubjectDoc) return;
        this.subjectLabel = createdSubjectDoc.subjectLabel;

    }

    async createSubject() {
            await database.getDbFunc().collection('subjects').insertOne({
                subjectName: this.subjectName,
                subjectLabel: this.subjectLabel
            });
        
    }

}

module.exports = CreateSubjects;