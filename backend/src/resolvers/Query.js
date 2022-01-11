const Query = {
    async users(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const users = await db.User.find()
        return users
    },
    async user(parent, args, {db, userID}){
        const user = await db.User.findOne({userID});
        return user
    },
    async courses(parent, args, {db, login}){
        let {filter} = args
        if (!filter) filter = {} 
        if (!login){
            filter.show = true
        }
        const courses = await db.Course.find(filter)
        return courses
    },
    async coursesForContribute(parent, args, {db}){
        let {filter} = args
        if (!filter) filter = {} 
        const courses = await db.Course.find(filter)
        return courses
    },
    async course(parent, args, {db, login}){
        const { courseID } = args
        const course = await db.Course.findById(courseID)
        if(!course.show && !login) return null
        return course
    },
    async exams(parent, args, {db, login}){
        const {courseID} = args
        const filter = {courseID}
        if (!login){
            filter.show = true
        }
        const exams = await db.Exam.find(filter)
        return exams
    },
    async examsForContribute(parent, args, {db, login}){
        const {courseID} = args
        const filter = {courseID}
        const exams = await db.Exam.find(filter)
        return exams
    },
    async exam(parent, args, {db, login}){
        const {courseID, examName} = args
        const exam = await db.Exam.findOne({courseID, examName})
        if(!exam.show && !login) return null
        return exam
    },
    async files(parent, args, {db, login}){
        const {examID} = args
        const filter = {examID}
        if (!login){
            filter.show = true
        }
        const files = await db.File.find(filter)
        return files
    },
    async file(parent, args, {db}){
        const {examID, fileID} = args
        const file = await db.File.findOne({examID, _id: fileID})
        if(!file.show && !login) return null
        return file
    },
};

export { Query as default };