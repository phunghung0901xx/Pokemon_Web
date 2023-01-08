import { FC, memo, useState, useEffect } from 'react'
import { Image } from 'antd'
const ImageComon: FC<any> = (props) => {
    const { src, errorImage, preview = false } = props
    const [mySrc, setMySrc] = useState(src)

    useEffect(() => {
        setMySrc(src)
    }, [src])

    return (
        <Image
            {...props}
            src={mySrc}
            preview={preview}
            onError={() => {
                setMySrc(errorImage)
            }}></Image>
    )
}

export default memo(ImageComon)
