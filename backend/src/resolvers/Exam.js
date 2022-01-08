const Exam = {
    files(parent, args, {db}){
        return Promise.all(
            parent.files.map((fileID) => db.Exam.findById(fileID))
        )
    }
};

export { Exam as default };