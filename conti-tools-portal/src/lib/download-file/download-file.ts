export const downloadFile = (blob: Blob, fileName: string) => {
  const downloadUrl = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.style.display = 'none';
  downloadLink.href = downloadUrl;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(downloadUrl);
  }, 0);
};
