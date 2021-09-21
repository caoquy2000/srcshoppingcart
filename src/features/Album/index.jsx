import React from 'react'
import PropTypes from 'prop-types'
import AlbumList from './components/AlbumList';

function AlbumFeature(props) {
    const albumList = [
        {
            id: '1',
            title: 'Mở Đầu Hoàn Hảo',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/7/b/a/17ba5720e78f37ed33351b9957fb507d.jpg'
        },
        {
            id: '2',
            title: 'Nhẹ Nhàng Cùng V-Pop',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/2/2/8/a/228ae8d6484203f420c65c44e85511a0.jpg'
        },
        {
            id: '3',
            title: 'Trong Tuần Nghe Gì?',
            thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/0/7/c/a07c63ed2a99ec820b37369e08d2bc63.jpg'
        }
    ];
    return (
        <div>
            <h2>Danh sách Album</h2>
            <AlbumList albumList={albumList} />
        </div>
    )
}

AlbumFeature.propTypes = {

}

export default AlbumFeature

