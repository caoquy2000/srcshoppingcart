import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';


function CounterFeature(props) {
    //tạo 1 dispatch để gửi action lên store
    const dispatch = useDispatch();
    //useSelector là 1 cái hook có thể giúp mình lấy state trong redux
    const count = useSelector(state => state.counter);

    const handleIncreaseClick = () => {
        const action = increase() // action creator
        dispatch(action);
    }

    const handleDecreaseClick = () => {
        const action = decrease();
        dispatch(action);
    }

    return (
        <div>
            Counter: {count}
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;