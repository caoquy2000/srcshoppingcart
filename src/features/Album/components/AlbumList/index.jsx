import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album';
import './style.scss';
AlbumList.propTypes = {
    albumList: PropTypes.array.isRequired,
};

function AlbumList(props) {
    const { albumList } = props;
    return (
        <div className="wrapper">
            <ul className="albumlist">
                {
                    albumList.map(album => (
                        <li key={album.id}>
                            <Album album={album} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default AlbumList;