import pubsub from "./pubsub.js"
import { withFilter } from "graphql-subscriptions";

const Subscription = {
    course: {
        subscribe: () => {
            return pubsub.asyncIterator('COURSE')
        }
    },
    exam: {
        subscribe: withFilter(
            () => pubsub.asyncIterator('EXAM'),
            (payload, variables) => {
                return payload.exam.courseID === variables.courseID || variables.courseID === "0"
            }
        )
    },
    file: {
        subscribe: withFilter(
            () => pubsub.asyncIterator('FILE'),
            (payload, variables) => {
                return payload.file.examID === variables.examID || variables.examID === "0"
            }
        )
    }
};

export { Subscription as default };