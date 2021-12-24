import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, setFile, url, setUrl }) => {
  const { progress, url: downloadedUrl } = useStorage(file);

  useEffect(() => {
    if (downloadedUrl) {
      setFile(null);
      setUrl(downloadedUrl);
    }
  }, [downloadedUrl, setFile]);

  return <div className='progress-bar' style={{ width: progress + '%' }}></div>;
};

export default ProgressBar;
