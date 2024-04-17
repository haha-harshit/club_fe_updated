// version "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

import "./qrstyles.css";
import { useState } from "react";
import QrReader from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QrScan = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
const navigate = useNavigate()
  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      
      setStartScan(false);
      setLoadingScan(false);
      window.location.href =  scanData;
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <h1 style={{padding:5,marginTop:30,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>Scan QR - <h1 style={{textAlign:"center",marginTop:0,fontWeight:"700",fontSize:22}}> Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select style={{marginTop:10}} onChange={(e) => setSelected(e.target.value)}>
            <option style={{color:"#fff"}} value={"environment"}>Back Camera</option>
            <option  style={{color:"#fff"}} value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode = "environment"
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default QrScan;