import BaseApi from "../api";

const api = BaseApi();

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        this.upload = this.upload.bind(this);
        this.abort = this.abort.bind(this);
    }

    async upload() {
        const file = await this.loader.file;
        const formData = new FormData();
        formData.append("image", file);

        try {
            const data = await api.post("/tutorials/upload-image", formData, "formData");
            data.default = data.linkUrl;
            return data;
        } catch (error) {
            return error;
        }
    }
    abort() {
        // Reject promise returned from upload() method.
    }
}

export default UploadAdapter;
