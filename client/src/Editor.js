import ReactQuill from "react-quill";

export default function Editor({value, onChange}) {
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    return (
        <div className="content">
        <ReactQuill
            value={value}
            theme={'snow'} // we used themes to get the image insertion tool in our edit page
            onChange={onChange}
            modules={modules} />
        </div>
    );
}