type PropsPreview = {
    urls: string[];
    width?: number;
    height?: number;
    defaulPreview?: string[];
    onDelete?: (index: number) => void;
}

const Preview: React.FC<PropsPreview> = (props) => {
    const { urls, width, height, onDelete, defaulPreview } = props;
    const data = urls.length > 0 ? urls : (defaulPreview ? defaulPreview : [])
    return (
        <>
            {data.map((url, index) => (
                <div key={index} className='image-container-preview d-inline-flex'>
                    <img
                        width={width ? width : 200}
                        height={height ? height : ''}
                        src={url}
                        alt={`preview-${index}`}
                    />
                    {onDelete && urls.length > 0 &&
                        <div className='overlay-button'>
                            <button type='button' onClick={(e) => {
                                e.stopPropagation();
                                onDelete && onDelete(index)
                            }}>
                                ×
                            </button>
                        </div>}
                </div>
            ))}
        </>
    )
}

export default Preview;