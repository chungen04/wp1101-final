const Mutation = {
    async createCourse(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const {
            year_semester,
            courseName,
            instructors,
            department,
            courseType,
            exams
        } = args.data
        const examIDs = await Promise.all(
            exams.map(async(examName)=> {
                const exam = await new db.Exam({examName, files: [], courseID:"test"}).save()
                return exam.id
            })
        )
        const course = await new db.Course({
            year_semester, 
            courseName,
            instructors,
            department,
            courseType,
            exams: examIDs
        }).save()
        await Promise.all(
            examIDs.map(async(examID)=> {
                await db.Exam.updateOne({_id: examID}, {courseID: course.id})
            })
        )
        return course
    },
    async updateCourse(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { data, courseID } = args
        await db.Course.updateOne({_id: courseID}, data)
        const course = await db.Course.findById(courseID)
        return course
    },
    async deleteCourse(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { courseID } = args
        const course = await db.Course.findOne({_id: courseID})
        if(!course) throw new Error("Course not found")
        const {exams} = course
        await Promise.all(
            exams.map(async(examID)=>{
                const exam = await db.Exam.findById(examID)
                const {files} = exam
                await Promise.all(
                    files.map(async(fileID)=> await db.File.deleteOne({_id: fileID}))
                )
                await db.Exam.deleteOne({_id: examID})
            })
        )
        await db.Course.deleteOne({_id: courseID})
        return true
    },
    async createExam(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { examName, courseID } = args
        const course = await db.Course.findById(courseID)
        if (!course) throw new Error("Course not found")
        const exam = await new db.Exam({
            courseID,
            examName,
            files: []
        }).save()
        await db.Course.updateOne({_id: courseID}, {exams: [...course.exams, exam.id]})
        return exam
    },
    async updateExam(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { examName, examID } = args
        await db.Exam.updateOne({_id: examID}, {examName})
        const exam = await db.Exam.findById(examID)
        return exam
    },
    async deleteExam(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { examID } = args
        const exam = await db.Exam.findById(examID)
        if(!exam) throw new Error("Exam not found")
        const {files, courseID} = exam
        await Promise.all(
            files.map(async(fileID)=>{
                await db.File.deleteOne({_id: fileID})
            })
        )
        const course = await db.Course.findById(courseID)
        const originalExams = course.exams
        const exams = await originalExams.filter((exam) => String(exam) !== examID)
        await db.Course.updateOne({_id: courseID}, {exams})
        await db.Exam.deleteOne({_id: examID})
        return true
    },
    async createFile(parent, args, {db, login}){
        const { data, examID } = args
        const {
            fileDownloadLink,
            fileViewLink
        } = data
        let {show} = data
        if (!login) show = false
        const exam = await db.Exam.findById(examID)
        if (!exam) throw new Error("Exam not found")
        const file = await new db.File({
            examID,
            fileDownloadLink,
            fileViewLink,
            uploadTime: Date.now(),
            show
        }).save()
        await db.Exam.updateOne({_id: examID}, {files: [...exam.files, file.id]})
        return file
    },
    async updateFile(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { data, fileID } = args
        await db.File.updateOne({_id: fileID}, data)
        const file = await db.File.findById(fileID)
        return file
    },
    async deleteFile(parent, args, {db, login}){
        if (!login) throw new Error("Not Login")
        const { fileID } = args
        const file = await db.File.findById(fileID)
        if(!file) throw new Error("File not found")
        const {examID} = file
        const exam = await db.Exam.findById(examID)
        const originalFiles = exam.files
        const files = await originalFiles.filter((file) => String(file) !== fileID)
        await db.Exam.updateOne({_id: examID}, {files})
        await db.File.deleteOne({_id: fileID})
        return true
    },
}



export { Mutation as default };