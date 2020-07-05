import axios from "axios";

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        this.upload = this.upload.bind(this);
        this.abort = this.abort.bind(this);
    }

    async upload() {
        const file = await this.loader.file;
        const formData = new FormData();
        formData.append("profile", file);
        console.log(this.loader);
        try {
            const res = await axios({
                url: `https://chat-app-datng.herokuapp.com/api/users/upload`,
                method: "post",
                data: formData,
                headers: {
                    token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYWE2OTBhZjUzZDc3MDAxNzdkNjdlYyIsImVtYWlsIjoidGFuZGF0MTk4QGdtYWlsLmNvbSIsIm5hbWUiOiJEYXQgTmd1eWVuIiwiaWF0IjoxNTkzOTI1NTc0LCJleHAiOjE1OTM5MzI3NzR9.1KYN3jbjvJ6_wLy5Ogdcmg-vKsjgva_B17oOMUIlhsI",
                    "content-type": "multipart/form-data",
                },
            });
            res.data.default = res.data.linkUrl;
            return res.data;
        } catch (error) {
            return error;
        }
    }
    abort() {
        // Reject promise returned from upload() method.
    }
}

export default UploadAdapter;
