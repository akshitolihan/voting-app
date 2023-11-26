import React, { useState } from 'react';
import ipfsClient from 'ipfs-http-client';
import AWS from 'aws-sdk';
import { create } from 'ipfs-http-client';

const FilebaseIPFSExample = () => {
  // Set your Filebase credentials and bucket name
  const filebaseConfig = {
    accessKeyId: 'B02FBEB24E71F1BBF965',
    secretAccessKey: 'LRp4elRRGK7PWlUyv2mKdr9QgyKPPhhl9VnxhnwK',
    region: 'India',
    bucketName: 'akshitolihan',
  };
  console.log("Filebase config is ", filebaseConfig)
  // Initialize Filebase
  const s3 = new AWS.S3(filebaseConfig);

  // Initialize IPFS client
  const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });


  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const uploadToIPFS = async () => {
    if (!file) return;

    // Read the file content
    const fileBuffer = await file.arrayBuffer();

    // Upload to IPFS
    const result = await ipfs.add({ content: fileBuffer });
    const cid = result.cid.toString();

    setIpfsHash(cid);

    // Upload to Filebase
    const params = {
      Bucket: filebaseConfig.bucketName,
      Key: cid,
      Body: fileBuffer,
      ContentType: file.type,
    };

    try {
      await s3.upload(params).promise();
      console.log('File uploaded to Filebase successfully');
    } catch (error) {
      console.error('Error uploading to Filebase:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToIPFS}>Upload to IPFS and Filebase</button>

      {ipfsHash && (
        <div>
          <p>IPFS Hash: {ipfsHash}</p>
          <img
            src={`https://ipfs.io/ipfs/${ipfsHash}`}
            alt="Uploaded from IPFS"
            style={{ maxWidth: '300px' }}
          />
        </div>
      )}
    </div>
  );
};

export default FilebaseIPFSExample;
