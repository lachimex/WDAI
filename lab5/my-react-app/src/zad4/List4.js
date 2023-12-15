import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import "./style4.css"

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
            } catch (error) { }
        })();
    }, []);

    const handleButtonClick = async (sortingFunction) => {
        if (sortingFunction) {
            const sortedData = [...data].sort(sortingFunction);
            setData(sortedData);
            const initSortedData = [...initData].sort(sortingFunction);
            setInitData(initSortedData);
        }
        else {
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
        <>
            <nav className="buttons">
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
            <div className="filter">
                <p>Wyszukaj:</p>
                <input
                    type="text"
                    id="myInput"
                    value={filterValue}
                    onChange={handleInputChange}
                />
            </div>
            <div className="container">
                {data && data.length > 0 ? (
                    <table className="product-table">
                        <tr>
                            <th id="thumbnail"></th>
                            <th id="title">Title</th>
                            <th id="price">Price</th>
                            <th id="description">Description</th>
                        </tr>
                        <tbody>
                            {data.map((product) => (
                                <Product key={product.id} product={product} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data</p>
                )}
            </div>
        </>);
}
