import axios from "axios";
import {
  pinatakey,
  pinatasecret,
  pinatajwt,
  readHeader,
  getHeader,
  sendJsonHeader,
  ipfsgateway,
} from "./config";

// FUNCTION TO CONVERT CURRENT DATE TO UNIX TIMESTAMP AND YEAR.MONTH.DAY

export async function getDate() {
  const dateFormat = new Date(Date.now());
  const dateValue =
    dateFormat.getMonth() +
    1 +
    "." +
    dateFormat.getDate() +
    "." +
    dateFormat.getFullYear();
  const time = new Date(dateValue.split(".").join("-")).getTime() / 1000;
  return { dateValue, time };
}

export async function sendJSONToIPFS(
  gettitle,
  getprice,
  getyear,
  getaddress,
  getcity,
  getcountry,
  getzip,
  gethoa,
  getinfo,
  getfloors,
  getbaths,
  getrooms,
  getgarage,
  sellername,
  selleremail,
  sellerphone,
  picture
) {
  const fetchdate = await getDate();
  const listdate = fetchdate.dateValue;
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  var data = JSON.stringify({
    pinataMetadata: {
      name: "houses",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      PropertyInfo: {
        Title: gettitle,
        Price: getprice,
        Year: getyear,
        Address: getaddress,
        City: getcity,
        Country: getcountry,
        Zip: getzip,
        Hoa: gethoa,
        Info: getinfo,
        Floors: getfloors,
        Baths: getbaths,
        Rooms: getrooms,
        Garage: getgarage,
        Name: sellername,
        Email: selleremail,
        Phone: sellerphone,
        Listed: listdate,
        Picture: "https://gateway.pinata.cloud/ipfs/" + picture
      },
    },
  });
  const resFile = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${resFile.data.IpfsHash}`;
  console.log(hash);
  // return hash;
  return "complete";
}

export async function sendFileToIPFS(file) {
  const formData = new FormData();
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  formData.append("file", file);
  const opts = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", opts);
  const options = {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      pinata_api_key: pinatakey,
      pinata_secret_api_key: pinatasecret,
      Accept: "text/plain",
    },
  };
  const resFile = await axios.post(url, formData, options);
  return resFile.data.IpfsHash;
}

export async function getFileFromIPFS() {
  const url = "https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=houses";
  const resFile = await axios.get(url, getHeader);
  const response = resFile.data.rows;
  return response.map((value) => value.ipfs_pin_hash);
}

export async function readFileFromIPFS() {
  const output = await getFileFromIPFS();
  const listArray = await Promise.all(output.map(async (value) => {
    const ipfsPath = "https://gateway.pinata.cloud/ipfs/" + value;
    const info = await axios.get(ipfsPath, readHeader);
    console.log(info.data.PropertyInfo);
    return info.data.PropertyInfo;
  }));
  console.log(listArray);
  return listArray;
}









