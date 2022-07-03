import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ placeholder, height, value, setValue }) => {

    const handleChange = (html) => {
        setValue(html);
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ color: [] }, { background: [] }],
            ["image"],
            ["clean"]
        ]
        
    };

    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'header', 'blockquote', 'code-block',
        'indent', 'list',
        'direction', 'align',
        'link', 'image', 'video', 'formula',
    ];

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            style={{ height: `${height}`, maxHeight: '70%'}}
        />
            
    );
};

export default RichTextEditor;