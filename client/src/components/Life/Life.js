import React from 'react'
import { connect } from 'dva'
import s from './Life.less'

const Life = () => {
    const image = [
        [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571108562&di=f06848dcf02a6d56aadd05006f33c090&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201312%2F27%2F20131227232853_fJCmr.jpeg",
            "http://img2.imgtn.bdimg.com/it/u=4151325179,923388517&fm=26&gp=0.jpg",
            "http://img3.imgtn.bdimg.com/it/u=3213599090,1762665317&fm=26&gp=0.jpg",
            "http://img3.imgtn.bdimg.com/it/u=144097523,2847977782&fm=26&gp=0.jpg"
        ],
        // [
        //     "http://img5.imgtn.bdimg.com/it/u=2407358919,2107131750&fm=26&gp=0.jpg",
        //     "http://img0.imgtn.bdimg.com/it/u=2972735819,2059190717&fm=26&gp=0.jpg",
        //     "http://img0.imgtn.bdimg.com/it/u=2177971862,1630084456&fm=26&gp=0.jpg",
        //     "http://img2.imgtn.bdimg.com/it/u=2491529849,649498479&fm=26&gp=0.jpg",
        //     "http://img0.imgtn.bdimg.com/it/u=2824651305,3893863999&fm=26&gp=0.jpg"
        // ]
    ]
    const handleShow = e => {
        const { target } = e.nativeEvent
        if (target.tagName.toUpperCase() === 'IMG') {
            const mask = document.getElementsByClassName(s.bigImg)[0]
            const IMG_WIDTH = target.offsetWidth
            const IMG_HEIGHT = target.offsetHeight
            const img = new Image()
            img.src = target.src

            const loadFn = _ => {
                const realWidth = _.target.width
                const MAX_HEIGHT = 500
                const realHeight = _.target.height
                const radioWidth = (MAX_HEIGHT * realWidth) / realHeight // 等比例宽度
                target.style.cssText = `width:${realHeight > MAX_HEIGHT ? radioWidth + 'px' : realWidth + 'px'}; height: ${realHeight > MAX_HEIGHT ? MAX_HEIGHT : realHeight}px;opacity: 1; z-index:1;translateX(0)`
                mask.style.display = 'block'
                mask.addEventListener('click', _ => {
                    target.style.cssText = `width:${IMG_WIDTH}px; height: ${IMG_HEIGHT}px;opacity: 0.5; z-index:0;`
                    mask.style.display = 'none'
                }, false)
            }

            img.onload = _ => {
                loadFn(_)
            }
        }
    }

    // const reMapImg = src=> (/localhost/.test(window.location) ? '/resouce/extra/1.jpg' : src)

    return (
        <div className={s.extraContainer}>
            <div className={s.bigImg}>
                <div id='imgCon' className={s.imgCon}>
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
            <div className={s.galleryContainer} onClick={(e) => handleShow(e)}>
                {
                    image.map((item, i) => {
                        return (
                            <div key={i} className={s.imgContainer}>
                                {item.map((_item, i) => {
                                    return (
                                        <img key={i} src={_item} alt='' />
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default connect()(Life)