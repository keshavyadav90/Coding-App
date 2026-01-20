import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import cpp from "../assets/images/cpp.png";
import java from "../assets/images/java.png";
import javascript from "../assets/images/javascript.png";
import python from "../assets/images/python.png";
import typescript from "../assets/images/typescript.png";

export const languages = [
    {
        id: 1,
        language: "JavaScript",
        image: javascript
    },
    {
        id: 2,
        language: "Python",
        image: python
    },
    {
        id: 3,
        language: "Java",
        image: java
    },
    {
        id: 4,
        language: "C++",
        image: cpp
    },
    {
        id: 5,
        language: "TypeScript",
        image: typescript
    }
]

// const language = () => {
//     return (
//         <View>
//             {languages.map((item) => (
//                 <View key={item.id}>
//                     <Image source={item.image} />
//                     <Text>{item.language}</Text>
//                 </View>
//             ))}
//         </View>
//     )
// }

