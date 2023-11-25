import React from 'react'
import QRCode from "react-qr-code";

const QRCodeGenerator = ({clubId}) => {
    const val = `https://club-nights/club/${clubId}`
  return (
    <div>

     <QRCode
    size={256}
    style={{ height: "200px", maxWidth: "200px", width: "150px" }}
    value={val}
    viewBox={`0 0 256 256`}
    />
    </div>
  )
}

export default QRCodeGenerator