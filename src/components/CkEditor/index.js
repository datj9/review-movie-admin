import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "../../adapter/UploadAdapter";

function CkEditor(props) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data='<p></p>'
            onInit={(editor) => {
                editor.ui.view.editable.element.style.height = "200px";
                editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
                    return new UploadAdapter(loader);
                };
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.handleEditorChange(data);
                console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
                console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
                console.log("Focus.", editor);
            }}
        />
    );
}

export default CkEditor;
