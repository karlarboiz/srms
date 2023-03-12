const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const database = require('../database/database');

class Teacher {
    constructor(arrayVal,id) {
        this.arrayVal = arrayVal

        if(id) {
            this.id = new ObjectId(id)
        }
        
    }

    static async fetchEnrolledSubjects(){
        const enrolledSubjects = await database.getDbFunc().collection('enrolledsubjects').find().toArray();
        return enrolledSubjects;
    }

    static async fetchGradedSubjects(){
        const gradedSubjects = await database.getDbFunc().collection('gradedsubjects').find().toArray();
        return gradedSubjects;
    }

    async fetchGrades() {
        if(!this.id) {
            return;
        }

        const grade = await database.getDbFunc().collection('gradedsubjects').findOne({_id: this.id});
        this._id = grade._id;
        this.teacher = grade.teacher;
        this.subject = grade.subject;
        this.teacherName = grade.teacherName;
        this.subjectName = grade.subjectName;
        this.enrolledUserID = grade.enrolledUserID;
        this.enrolledUserIDName = grade.enrolledUserIDName;
        this.grades = grade.grades
    }

    async saveGradedSubjects() {
        await database.getDbFunc().collection('gradedsubjects').insertOne(this.arrayVal);
    }

    async saveGrade() {
        await database.getDbFunc().collection('gradedsubjects').updateOne({_id: this.id},{$set:{
            grades: this.arrayVal
        }});
    }

}

module.exports = Teacher;