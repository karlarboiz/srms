const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const database = require('../database/database');

class Student {
    constructor(arrayVal,id) {
        this.arrayVal = arrayVal;
        this.id = new ObjectId(id)
        
    }

    static async fetchAssignedSubjects(){
        const assignedsubjects = await database.getDbFunc().collection('assignedsubjects').find().toArray();
        return assignedsubjects;
    }

    static async fetchEnrolledSubjects(){
        const enrolledSubjects = await database.getDbFunc().collection('enrolledsubjects').find().toArray();
        return enrolledSubjects;
    }

    static async fetchGradedSubjects(){
        const gradedSubjects = await database.getDbFunc().collection('gradedsubjects').find().toArray();
        return gradedSubjects;
    }

    async fetchProfileVal() {
        if(!this.id) {
            return;
        }

        const findProfile = await database.getDbFunc().collection('storedata').findOne({_id: this.id});
        this.name = findProfile.name;

    }

    async fetchAssignedSubject() {
        if(!this.id) {
            return;
        }

        let assignedSubjects = await database.getDbFunc().collection('assignedsubjects').findOne({_id: this.id});
        this.teacher = assignedSubjects.teacher;
        this.subject = assignedSubjects.subject;
        this.teacherName = assignedSubjects.teacherName;
        this.subjectName = assignedSubjects.subjectName
    }

    async saveEnrolledSubjects() {
        await database.getDbFunc().collection('enrolledsubjects').insertOne({
            teacher:this.arrayVal.teacher,
            subject: this.arrayVal.teacher,
            teacherName: this.arrayVal.teacherName,
            subjectName: this.arrayVal.subjectName,
            enrolledUserID: this.arrayVal.enrolledUserID,
            enrolledUserIDName: this.arrayVal.enrolledUserIDName
        });
    }

}

module.exports = Student;