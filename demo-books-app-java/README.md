
## Version Compatibility Issues
https://stackoverflow.com/questions/76188050/how-to-fix-gradle-build-failed-due-to-void-org-gradle-api-internal-artifacts-dsl

One of the main difficulties encountered in this project was the version conflict among Spring Boot, Java, and Gradle. Here are the key points to remember:

- Spring Boot 2.6 does not support Gradle 8.x. Spring Boot’s Gradle plugin requires Gradle 6.8, 6.9, or 7.x.
- Support for Gradle 8 was added in Spring Boot 2.7. Therefore, you can either upgrade to Spring Boot 2.7 or downgrade to Gradle 7.x.
- Java 11 is not compatible with Spring Boot 3.x and Gradle 8.x. You need to upgrade to Java 17.

To avoid similar issues in the future, ensure that the versions of Spring Boot, Java, and Gradle you are using are compatible with each other. Refer to the official documentation for each tool to verify compatibility.