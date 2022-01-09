import pubsub from "./pubsub"
import db from "../models"
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
                return payload.exam.courseID === variables.courseID
            }
        )
    },
    file: {
        subscribe: withFilter(
            () => pubsub.asyncIterator('FILE'),
            (payload, variables) => {
                return payload.file.examID === variables.examID
            }
        )
    }
};

export { Subscription as default };