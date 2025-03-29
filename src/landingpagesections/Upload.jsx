"use client"
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "react-bootstrap";
import { IoCloudUpload } from "react-icons/io5";
import { uploadFileToAI } from "../utils/api"; // Import the new utility function

const Upload = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [businessScores, setBusinessScores] = useState({}); // Store business scores

    const onDrop = useCallback(async (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
        }));
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Process each file via the AI endpoint
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await uploadFileToAI(formData); // Call the API
                setBusinessScores((prevScores) => ({
                    ...prevScores,
                    [file.name]: response.businessScore, // Save the score
                }));
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='herobg py-5'>
            <Container className='pt-5'>
                <Row>
                    <Col xs={12} lg={8} className='mx-auto text-center'>
                        <div className="drop-container">
                            <Card className="bg-transparent text-center py-5" style={{ border: "3px dashed #ffa500", cursor: "pointer" }}>
                                <div {...getRootProps()} className="">
                                    <input {...getInputProps()} />
                                    <IoCloudUpload size={40} color='#ffa500' />
                                    <p className="text-white">Drag & drop files here, or click to select files</p>
                                </div>
                                <div className="uploaded-files mt-3 d-flex  gap-3 justify-content-center align-items-center">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="mt-2">
                                            {file.type.startsWith("image/") ? (
                                                <img src={file.url} alt={file.name} className="img-thumbnail" style={{ width: "30px", height: "30px", objectFit: "cover" }} />
                                            ) : (
                                                <p className="text-white">{file.name}</p>
                                            )}
                                            {businessScores[file.name] !== undefined && (
                                                <p className="text-success">Business Score: {businessScores[file.name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Upload
