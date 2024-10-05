import axios from 'axios'

export default {
    async UploadCRMFile(fileInput) {
        let formData = new FormData();
        formData.append("file", fileInput);
        formData.append("fileName", fileInput.name);

       const res = await axios.post('https://ctpmsapi.infracredit.ng/infraUpload/UploadCRMFiles',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(req=> {
            console.log('SUCCESS!!');
            return req.data
        })
            .catch(function () {
                console.log('NO!!');
            });
            return res
        },

    async UploadTRMSFile(fileInput) {
        let formData = new FormData();
        formData.append("file", fileInput);
        formData.append("fileName", fileInput.name);

       const res = await axios.post('https://ctpmsapi.infracredit.ng/infraUpload/UploadTRMSFiles',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(req=> {
            console.log('SUCCESS!!');
            return req.data
        })
            .catch(function () {
                console.log('NO!!');
            });

            return res 
        },

    async DownloadCRMFile(fileName) {
        try {
            let response = await fetch(`https://ctpmsapi.infracredit.ng/infraUpload/DownloadCRMFiles?filename=${fileName}`);
            let posts = await response.blob();
            return posts
        } catch (error) {
            console.log(error)
        }
    },

    async DownloadTRMSFile(fileName) {
        try {
            let response = await fetch(`https://ctpmsapi.infracredit.ng/infraUpload/DownloadTRMSFiles?filename=${fileName}`);
            let posts = await response.blob();
            return posts
        } catch (error) {
            console.log(error)
        }
    }
}