import React from "react";

export default function Qr() {
  const [qrCodeData, setQRCodeData] = useState("");

  let timer;
  useEffect(() => {
    generateQRCode();

    return () => clearTimeout(timer);
  }, []);

  const generateQRCode = () => {
    const studentInfo = getStudentInfo();
    setQRCodeData(studentInfo);
    startTimer();
  };

  const startTimer = () => {
    setTimeout(() => {
      generateQRCode();
    }, 10000);
  };

  function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }

  function base64Encode(text) {
    return btoa(text);
  }
  function knitString(str) {
    let result = "";
    let left = 0;
    let right = str.length - 1;

    while (left <= right) {
      if (left === right) {
        result += str[left];
      } else {
        result += str[left] + str[right];
      }
      left++;
      right--;
    }

    return result;
  }

  function encryptText(text) {
    var knitted = knitString(knitString(text));
    var base64Text = base64Encode(knitted);
    var rot13Text = rot13(base64Text);
    var finalText = base64Encode(rot13Text);
    console.log(finalText);
  }

  const getStudentInfo = () => {
    var currentTime = Math.floor(Date.now() / 1000);
    var finalouput = encryptText("example@gmail.com" + currentTime);

    const studentInfo = `${finalouput}`;

    return studentInfo;
  };
  return (
    <div>
      {qrCodeData && <QRCode value={qrCodeData} size={200} key={qrCodeData} />}
    </div>
  );
}
