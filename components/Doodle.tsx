import { View } from "react-native";
import React from "react";
import { Dots } from "~/assets/doodles/dots";
import { Text } from "./ui/text";
import { Log } from "~/assets/doodles/log";
import { BLine } from "~/assets/doodles/bline";
import { Squarle } from "~/assets/doodles/squarle";

const doodles = {
  dots: Dots,
  log: Log,
  bline: BLine,
  squarle: Squarle,
};

interface IDoodle {
  className?: string;
  doodle: keyof typeof doodles;
}

function Doodle({ className, doodle }: IDoodle) {
  const DoodleComponent = doodles[doodle];

  return (
    <View className={`absolute  ${className} `}>
      <DoodleComponent />
    </View>
  );
}

export default Doodle;
