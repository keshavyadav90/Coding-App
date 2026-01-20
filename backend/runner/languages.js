export const LANGUAGES = {
    python : {
        image : "python:3.11 -alpine" ,
        fileName : "main.py",
        runCmd : "python main.py"
    },
    javascript : {
        image : 'node:20-alpine',
        fileName : "main.js",
        runCmd : "node main.js"
    },
    java : {
        image : "openjdk:21 -slim",
        fileName : "Main.java" ,
        runCmd : "javac Main.java && java Main"
    },
    cpp :{
        image : "gcc:13" ,
        fileName : "main.cpp",
        runCmd : "g++ main.cpp -02 -o main && ./main"
    }
}