import React, { useState } from 'react';
import PropTypes from 'prop-types';

//TODO: haves a bug
const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleLeftButtonClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleRightButtonClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative">
            <div className="flex justify-center items-center">
                <button
                    className="absolute z-10 bg-gray-800 bg-opacity-50 text-white top-1/2 transform -translate-y-1/2 left-0 px-4 py-2 rounded-l-md hover:bg-opacity-75 transition ease-in-out duration-150 focus:outline-none focus:shadow-outline-blue active:bg-gray-800 active:bg-opacity-50"
                    onClick={handleLeftButtonClick}
                >
                    &larr;
                </button>
                <button
                    className="absolute z-10 bg-gray-800 bg-opacity-50 text-white top-1/2 transform -translate-y-1/2 right-0 px-4 py-2 rounded-r-md hover:bg-opacity-75 transition ease-in-out duration-150 focus:outline-none focus:shadow-outline-blue active:bg-gray-800 active:bg-opacity-50"
                    onClick={handleRightButtonClick}
                >
                    &rarr;
                </button>
                <img
                    src={images[currentImageIndex]}
                    alt="Slider"
                    className="w-full h-auto transition duration-500 ease-in-out transform hover:scale-110"
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 mx-2 rounded-full cursor-pointer ${
                            currentImageIndex === index
                                ? 'bg-black'
                                : 'bg-gray-300 hover:bg-black'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
