import React, { useEffect, useRef, useState } from "react";
import './style.css';
import Toast from "./Toast";
import Preview from "./Preview";

type Props = {
    name?: string;
    handleChange?: (arg0: Array<File> | null) => void;
    limit?: number;
    placeholder?: string;
    title?: string;
    clearTitle?: string;
    withImagePreview?: number;
    heightImagePreview?: number;
    messageLimit?: string;
    showMessageLimit?: boolean;
}


const DragDropFile: React.FC<Props> = (props): JSX.Element => {
    const { handleChange, limit, placeholder, title, clearTitle, withImagePreview, heightImagePreview, messageLimit, showMessageLimit } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<Array<File> | null>(null);

    const [urlsPreview, setUrlsPreview] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSelectFile = () => {
        fileInputRef.current?.click();
    }

    const handleChoseFile = () => {
        const filesChose = fileInputRef.current?.files;
        filesChose && handleFileChange(filesChose);
    };

    const handleFileChange = async (filesChange: FileList) => {
        if (limit && files) {
            if (files.length >= limit) { setShowToast(true); return; }
        }

        if (filesChange && filesChange.length > 0) {
            let fileArr = Array.from(filesChange);

            if (!fileArr[0].type.startsWith("image/")) {
                setShowToast(true);
                return;
            }


            setFiles(prevFile => {
                if (prevFile && prevFile.length > 0) {
                    handleChange && handleChange([...fileArr, ...prevFile]);
                    return [...fileArr, ...prevFile]
                }
                handleChange && handleChange(fileArr);
                return fileArr;
            });
            setLoading(true);
            const urls = await Promise.all(fileArr.map(readFileAsDataURL));
            setLoading(false);
            setUrlsPreview(prev => [...prev, ...urls]);
        }

    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const files = event.dataTransfer?.files;

        files && handleFileChange(files);
    };

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleClearImage = () => {
        setFiles(null);
        setUrlsPreview([]);
        return false;
    }

    const handleDeleteOne = (idx: number) => {
        setFiles(prev => {
            if (!prev) {
                return [];
            }

            const newFiles = prev.filter((_, index) => index !== idx);
            return newFiles;
        });

        setUrlsPreview(prev => {
            const newUrls = prev.filter((_, index) => index !== idx);
            return newUrls;
        });
    }

    const [showToast, setShowToast] = useState<boolean>(false);

    return (
        <section>
            <div className="container-drag">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            {title && <label className="control-label">{title && title}</label>}
                            {showToast && showMessageLimit && <Toast message={messageLimit} onClose={() => setShowToast(false)} />}
                            <div className="dropzone-wrapper"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleSelectFile}
                            >
                                {urlsPreview.length > 0 &&
                                    <button onClick={(e) => { e.stopPropagation(); handleClearImage() }} type="button" className="button-clear" title={clearTitle ? clearTitle : 'Clear image'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 128 128">
                                            <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
                                        </svg>
                                    </button>}
                                {urlsPreview.length === 0 && <div className="dropzone-desc">

                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                                    </svg>
                                    <p>{placeholder ? placeholder : `Choose an image file or drag it here.`}</p>
                                </div>}
                                <div className="preview-zone">
                                    <Preview
                                        urls={urlsPreview}
                                        width={withImagePreview}
                                        height={heightImagePreview}
                                        onDelete={handleDeleteOne}
                                    />
                                </div>
                                <div onClick={(e) => { e.stopPropagation(); }} style={{ display: loading ? "block" : "none" }} className="overlay-loading">
                                    <div className="loader"></div>
                                </div>
                                <input onChange={handleChoseFile} ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DragDropFile;