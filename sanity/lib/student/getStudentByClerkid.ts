import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Student } from "@/sanity.types";

export async function getStudentByClerkid(clerkId: string) {
    const getStudentByClerkidQuery = defineQuery(
        `*[_type == "student" && clerkId == $clerkId][0]`
    );
    const student = await sanityFetch({query:getStudentByClerkidQuery,params:{clerkId}});

    return student.data as Student;
}