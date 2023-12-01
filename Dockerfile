FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY build.gradle settings.gradle gradlew /app/
COPY gradle /app/gradle
RUN chmod +x ./gradlew
COPY src /app/src
RUN ./gradlew build -x test
RUN ls -la build/libs/
COPY build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]