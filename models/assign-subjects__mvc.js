const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
const database = require('../database/database');


class AssignSubjects {
    constructor(teacher,subject,teacherName,subjectName,id,specID,compareVal) {
        this.teacher = teacher,
        this.subject = subject,
        this.teacherName = teacherName,
        this.subjectName = subjectName,
        this.specID = specID,
        this.compareVal = compareVal

        if(id) {
            this.id = new ObjectId(id)
        }
    }

    static async fetchStoreData(){
       const storedata = await database.getDbFunc().collection('storedata').find().toArray();
        return storedata;
    }

    static async fetchSubjects(){
        const subjects = await database.getDbFunc().collection('subjects').find().toArray();
        return subjects;
    }

    async fetchTeacherData() {

        if(!this.id) {
            return;
        }

        const teacherDoc = await database.getDbFunc().collection('storedata').findOne({_id: this.id});
        this.completeName = `${teacherDoc.name.firstName} ${teacherDoc.name.middleName } ${teacherDoc.name.lastName}`
    }

    async fetchSubjectData() {

        if(!this.id) {
            return;
        }

        const subjectDoc = await database.getDbFunc().collection('subjects').findOne({_id: this.id});
        this.completeName = `${subjectDoc.subjectName} ${subjectDoc.subjectLabel}`
    }

    async fetchExistingAssignedSubject() {

        if(!this.specID) {
            return;
        }

        const assignedSubjectDoc = await database.getDbFunc().collection('assignedsubjects').find().toArray();
        const filteredAssignment = assignedSubjectDoc.filter(val => val.subject === this.specID)
        const confirmedAssignment = filteredAssignment.find(val => val.teacher === this.compareVal)
        

        if(!confirmedAssignment) {
            return;
        }
        this.teacher = confirmedAssignment.teacher;
    }

    async saveSubject() {
            await database.getDbFunc().collection('assignedsubjects').insertOne({
                teacher: this.teacher,
                subject: this.subject,
                teacherName: this.teacherName,
                subjectName: this.subjectName
            });
        
    }

}

module.exports = AssignSubjects;