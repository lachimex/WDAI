import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import './style2.css'

function compareByTitleDesc(a, b) {
    var comparison = a.title.localeCompare(b.title);
    return -comparison;
}

function compareByTitleAsc(a, b) {
    var comparison = a.title.localeCompare(b.title);
    return comparison;
}

async function fetching() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error("Network request failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default function List() {
    const [data, setData] = useState([]);
    const [initData, setInitData] = useState([]);
    const [filterValue, setFilterValue] = useState("");


    useEffect(() => {
        (async () => {
            try {
                const result = await fetching();
                setData(result.products);
                setInitData(result.products);
            } catch (error) {}
        })();
    }, []);

    const handleButtonClick = async (sortingFunction) => {
        if (sortingFunction){
            const sortedData = [...data].sort(sortingFunction);
            setData(sortedData);
            const initSortedData = [...initData].sort(sortingFunction);
            setInitData(initSortedData);
        }
        else{
            const result = await fetching();
            setData(result.products);
            setInitData(result.products);
            setFilterValue("");
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setFilterValue(inputValue);
        const filterData = [...initData].filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()));
        console.log(filterData);
        setData(filterData);
    };

    return (
        <div>
            <nav id="1">
                <button onClick={() => handleButtonClick(null)}>
                    Bez filtrowania
                </button>
                <button onClick={() => handleButtonClick(compareByTitleAsc)}>
                    Sortowanie rosnace
                </button>
                <button onClick={() => handleButtonClick(compareByTitleDesc)}>
                    Sortowanie malejace
                </button>
            </nav>
            <nav id="2">
                <div className="filter">
                    <p>Wyszukaj:</p>
                    <input
                        type="text"
                        id="myInput"
                        value={filterValue}
                        onChange={handleInputChange}
                    />
                </div>
            </nav>
            {data && data.length > 0 ? (
                data.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}
