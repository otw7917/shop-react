const CloudinaryUrl = import.meta.env.VITE_UPLOAD_URL;
const Upload_Preset = import.meta.env.VITE_UPLOAD_PRESET;

interface UploadResponseData {
  url: string;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  // single upload
  formData.append("file", file);
  formData.append("upload_preset", Upload_Preset);

  return await fetch(CloudinaryUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data: UploadResponseData) => {
      console.log(data);
      return data.url;
    });
}
