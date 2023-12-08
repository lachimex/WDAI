import React, { useState, useEffect } from "react";
import Product from "./Product.js";

function compareByTitleDesc(a, b) {
    var comparison = a.title.localeCompare(b.title);
    return -comparison;
}

function compareByTitleAsc(a, b) {
    var comparison = a.title.localeCompare(b.title);
    return comparison;
}

async function fetchWithSortingAndFilter(sortingFunction, filterValue) {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
            throw new Error("Network request failed");
        }
        const data = await response.json();
        if (sortingFunction != null) {
            data.products.sort(sortingFunction);
        }
        if (filterValue) {
            data.products = data.products.filter((product) =>
                product.title.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to propagate it
    }
}

export default function List() {
    const [data, setData] = useState(null);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchWithSortingAndFilter(
                    compareByTitleAsc,
                    filterValue
                );
                setData(result);
            } catch (error) {
                // Handle error, e.g., show an error message
            }
        })();
    }, [filterValue]); // Add filterValue as a dependency

    const handleButtonClick = async (sortingFunction) => {
        try {
            const result = await fetchWithSortingAndFilter(
                sortingFunction,
                filterValue
            );
            setData(result);
        } catch (error) {
            // Handle error, e.g., show an error message
        }
    };

    const handleInputChange = (event) => {
        setFilterValue(event.target.value);
    };

    return (
        <>
            <nav id="1">
                <button onClick={() => handleButtonClick(null)}>
                    Bez sortowania
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
            {data && data.products ? (
                data.products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </>
    );
}
