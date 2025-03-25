import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {

    const [allProduct, setAllProduct] = useState([]);
    const { count } =useLoaderData();
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);

    // const pages = [];
    // for(let i = 0; i < numberOfPages ; i++){
    //     pages.push(i)
    // }
    // console.log(pages);

    const pages = [...Array(numberOfPages).keys()];

    
        useEffect(() => {
            fetch('http://localhost:5000/products')
                .then(res => res.json())
                .then(data => {
                    setAllProduct(data);
                })
        }, [])
    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h1 className="text-center font-semibold text-2xl mb-10 text-red-600">Total Count : {count}</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 gap-8">
                {allProduct.map((pro, idx) => <div key={idx} className="max-w-sm p-4 bg-white shadow-lg rounded-2xl flex flex-col items-center space-y-4">
                    <img src={pro.img} alt="" className="w-40 h-40 object-cover rounded-lg text-center" />
                    <h2 className="text-lg font-semibold text-gray-800 text-center">{pro.name}</h2>
                    <p className="text-gray-600">Seller: {pro.seller}</p>
                    <p className="text-lg font-bold text-gray-900">${pro.price}</p>
                    <p className="text-gray-500">Stock: {pro.stock}</p>
                    <p className="text-gray-500">Shipping: ${pro.shipping}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>)}
            </div>
            <div className="text-center mt-10">
                 {
                    pages.map( (page,idx) => <button className="btn p-4 ml-2" key={idx}>{page}</button>)
                 }
            </div>
        </div>
    );
};

export default Home;