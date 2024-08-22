import React, { useState } from 'react';
import './ButtonUploadImage.less';
import { Spin, Upload } from 'antd';
import { API, POST_METHOD } from '~/configs/consts/api.const';
const handleUploadApi = async (data) => {
  try {
    const response = await fetch(API.CREATE_IMG_URL, data);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
};

function ButtonUploadImage({ initUrl, getResUrl }) {
  const [imageUrl, setImageUrl] = useState(initUrl);
  const [loading, setLoading] = useState(false);
  const customRequest = async ({ file, onSuccess, onError }) => {
    setLoading(true); // Start loading indicator
    try {
      const formData = new FormData();
      formData.append('file', file);

      const headers = new Headers({
        "Accept": "application/json",
      });

      const requestOptions = {
        method: POST_METHOD,
        headers,
        body: formData,
        redirect: "follow",
      };

      const url = await handleUploadApi(requestOptions);

      if (url) {
        setImageUrl(url); // Set the uploaded image URL
        onSuccess(url);
        getResUrl(url)
        message.success('Upload successful!');
      } else {
        onError(new Error("Failed to retrieve URL"));
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className='upload'>
      <Upload.Dragger
        name="files"
        accept=".jpg,.png,.jpeg"
        customRequest={customRequest}
        showUploadList={false} // Hide the default upload list
      >
        <p>Nhấn để thay đổi hình ảnh</p>
        {loading ? (
          <Spin tip="Uploading..." />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain', // Adjust the image to fit within the frame
              maxHeight: '200px', // Max height for the image frame
            }}
          />
        ) : (
          <p>Thêm hình ảnh tại đây</p>
        )}
      </Upload.Dragger>
    </div>
  );
}

export default ButtonUploadImage;