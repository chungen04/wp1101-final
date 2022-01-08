const Course = {
    exams(parent, args, {db}){
        return Promise.all(
            parent.exams.map((examID) => db.Exam.findById(examID))
        )
    }
};

export { Course as default };