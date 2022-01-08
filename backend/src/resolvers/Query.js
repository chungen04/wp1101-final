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
    async courses(parent, args, {db}){
        const {
            year_semester,
            courseName,
            department,
            courseType
        } = args.filter
        const filter = {}
        if (year_semester) filter.year_semester = year_semester
        if (courseName) filter.courseName = courseName
        if (department) filter.department = department
        if (courseType) filter.courseType = courseType
        const courses = await db.Course.find(filter)
        return courses
    },
    async course(parent, args, {db}){
        const { courseID } = args
        const course = await db.Course.findById(courseID)
        return course
    },
    async exams(parent, args, {db}){
        const {courseID} = args
        const exams = await db.Exam.find({courseID})
        return exams
    },
    async exam(parent, args, {db}){
        const {courseID, examName} = args
        const exam = await db.Exam.findOne({courseID, examName})
        return exam
    },
    async files(parent, args, {db}){
        const {examID} = args
        const files = await db.File.find({examID})
        return files
    },
    async file(parent, args, {db}){
        const {examID, fileID} = args
        const files = await db.File.findOne({examID, _id: fileID})
        return files
    },
};

export { Query as default };