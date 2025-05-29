import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Admin Dashboard")
    .items([
      // Course Content Section (moved to top)
      S.listItem()
        .title("Course Content")
        .id('courseContent')  // Explicit ID to prevent duplicates
        .child(
          S.documentTypeList("course")
            .title("Courses")
            .child((courseId) =>
              S.list()
                .title("Course Options")
                .items([
                  S.listItem()
                    .title("Edit Course Content")
                    .child(
                      S.document()
                        .schemaType("course")
                        .documentId(courseId)
                    ),
                  S.listItem()
                    .title("View Students")
                    .child(
                      S.documentList()
                        .title("Course Enrollments")
                        .filter('_type == "enrollment" && course._ref == $courseId')
                        .params({ courseId })
                    )
                ])
            )
        ),

      S.divider(),

      // User Management Section
      S.listItem()
        .title("User Management")
        .id('userManagement')  // Explicit ID
        .child(
          S.list()
            .title("Select a Type of User")
            .items([
              // Students Section
              S.listItem()
                .title("Students")
                .schemaType("student")
                .child(
                  S.documentTypeList("student")
                    .title("Students")
                    .child((studentId) =>
                      S.list()
                        .title("Student Options")
                        .items([
                          // Option to edit student details
                          S.listItem()
                            .title("Edit Student Details")
                            .child(
                              S.document()
                                .schemaType("student")
                                .documentId(studentId)
                            ),
                            // Option to view enrollments
                          S.listItem()
                            .title("View Enrollments")
                            .child(
                              S.documentList()
                                .title("Student Enrollments")
                                .filter('_type == "enrollment" && student._ref == $studentId')
                                .params({ studentId })
                            ),
                            //Option to view completed lessons
                          S.listItem()
                            .title("View Completed Lessons")
                            .child(
                              S.documentList()
                                .title("Completed Lessons")
                                .schemaType("lessonCompletion")
                                .filter('_type == "lessonCompletion" && student._ref == $studentId')
                                .params({ studentId })
                                .defaultOrdering([
                                  { field: "completedAt", direction: "desc" }
                                ])
                            )
                        ])
                    )
                ),

              // Instructors Section
              S.listItem()
                .title("Instructors")
                .schemaType("instructor")
                .child(
                  S.documentTypeList("instructor")
                    .title("Instructors")
                    .child((instructorId) =>
                      S.list()
                        .title("Instructor Options")
                        .items([
                          // Option to edit instructor details
                          S.listItem()
                            .title("Edit Instructor Details")
                            .child(
                              S.document()
                                .schemaType("instructor")
                                .documentId(instructorId)
                            ),
                          // Option to view courses taught by the instructor
                          S.listItem()
                            .title("View Courses")
                            .child(
                              S.documentList()
                                .title("Instructor's Courses")
                                .filter('_type == "course" && $instructorId in instructors[]._ref')
                                .params({ instructorId })
                            )
                        ])
                    )
                )
            ])
        ),
        S.divider(),
        //system Management Section
      S.listItem()
        .title("System Management")
        .id('systemManagement')  // Explicit ID
        .child(
          S.list()
            .title("System Management Options")
            .items([S.documentTypeListItem("category").title("Categories")])

          ),
    ]);