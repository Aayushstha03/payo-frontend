import { CameraType, useCameraPermissions, CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "./ui/text";

function QRScanner({ onScan }: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const ref = useRef(null);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  return permission && permission.granted ? (
    <CameraView
      ref={ref}
      facing={facing}
      className="w-[400px] h-[400px]"
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={(data) => onScan(data)}
    >
      <View className="w-[300px] h-[400px]"></View>
    </CameraView>
  ) : (
    <Text>No Permission</Text>
  );
}

export default QRScanner;
