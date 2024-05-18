type PropsPreview = {
    urls: string[];
    width?: number;
    height?: number;
    onDelete?: (index: number) => void;
}

const Preview: React.FC<PropsPreview> = (props) => {
    const { urls, width, height, onDelete } = props;
    console.log("childrend", urls);
    return (
        <>
        {urls.map((url, index) => (
            <div key={index} className='image-container d-inline-flex'>
                <img
                    width={width ? width : 200}
                    height={height ? height : ''}
                    src={url}
                    alt={`preview-${index}`}
                />
                {onDelete && <div className='overlay-button'>
                    <button type='button' onClick={(e) => {
                        e.stopPropagation();
                        console.log("index", index);
                        onDelete && onDelete(index)
                    }
                    }>×</button>
                </div>}
            </div>
        ))}
    </>
    )
}

export default Preview;