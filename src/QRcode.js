import React from "react";
import QRCodeReact from "qrcode.react";

const QRCode = ({ text }) => {
  return <QRCodeReact value={text} />;
};

export default QRCode;
