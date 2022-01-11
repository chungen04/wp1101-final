import { gql } from '@apollo/client';

export const USER_CONTRIBUTION_MUTATION = gql`
    mutation createFile(
        $courseName: String!
        $department: String!
        $instructor: String!
        $year_semester: String!
        $type: String!
    )
`