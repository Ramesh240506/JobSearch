# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar built by Maven/Gradle
COPY target/*.jar app.jar

# Expose port (Render will assign PORT dynamically)
ENV PORT 8080
EXPOSE $PORT

# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]
