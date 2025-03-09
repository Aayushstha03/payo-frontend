import { View } from "react-native";
import React from "react";
import { Dots } from "~/assets/doodles/dots";

interface IDoodle {
  top: String;
  left: String;
  size?: String;
  doodle: String;
}

const doodles = {
  dots: Dots,
};
function Doodle({ top, left, size, doodle }: IDoodle) {
  return <View className="absolute">{}</View>;
}

export default Doodle;
