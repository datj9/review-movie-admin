import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import List from "@ckeditor/ckeditor5-list/src/list";
import Link from "@ckeditor/ckeditor5-link/src/link";
import UploadAdapter from "../../adapter/UploadAdapter";

const editorConfiguration = {
    plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Font,
        List,
        FileRepository,
        Image,
        ImageUpload,
        ImageToolbar,
        ImageResize,
        ImageCaption,
        Indent,
        IndentBlock,
        Link,
    ],
    toolbar: [
        "heading",
        "bold",
        "italic",
        "fontColor",
        "fontBackgroundColor",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "imageUpload",
        "link",
        "selectAll",
        "undo",
        "redo",
    ],
    image: {
        toolbar: ["imageTextAlternative"],
    },
};

export default function CustomEditor({ editorValue, handleEditorValue }) {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={editorValue}
            onInit={(editor) => {
                editor.ui.view.editable.element.style.height = "200px";
                editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
                    return new UploadAdapter(loader);
                };
            }}
            onChange={handleEditorValue}
        />
    );
}
