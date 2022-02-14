import React, { useState } from 'react';

export default function useInfos(infos) {
	const [arr, setArr] = useState([...infos]);
    const setArrayInfo = (index , data) => {
        setArr([...arr.map((arrData,arrIndex) => 
        { 
            if(arrIndex === index) return data;
            else return arrData;
        })]);
    }
    const addData = (data) => {
        setArr([...arr, data]);
    }
	const handleCloseArr = (_index) => {
		setArr(arr.filter((_, index) => index !== _index));
	};
    return [arr, addData, setArrayInfo, handleCloseArr];
}
