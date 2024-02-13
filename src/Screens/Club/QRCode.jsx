import React from 'react'
import QRCode from "react-qr-code";

const QRCodeGenerator = ({clubId}) => {

  
    const val = `http://localhost:3000/opendj/${clubId}`
  return (
    <div>
     <QRCode
    size={256}
    style={{ height: "200px", maxWidth: "180px", width: "200px" }}
    value={val}
    viewBox={`0 0 256 256`}
    />
    </div>
  )
}

export default QRCodeGenerator