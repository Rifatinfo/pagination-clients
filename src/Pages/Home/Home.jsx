import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {

    const [allProduct, setAllProduct] = useState([]);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const numberOfPages = Math.ceil(count / itemPerPage);

    // const pages = [];
    // for(let i = 0; i < numberOfPages ; i++){
    //     pages.push(i)
    // }
    // console.log(pages);
    const handleItemPerPage = e => {
        console.log(e.target.value)
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0);
    }
    const handlePrevPage = () => {
        if(currentPage > 0){
           setCurrentPage(currentPage - 1)
        }
    }
    
    const pages = [...Array(numberOfPages).keys()];
    const handleNextPage = () =>{
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }
    
        useEffect(() => {
            fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}`)
                .then(res => res.json())
                .then(data => {
                    setAllProduct(data);
                })
        }, [currentPage, itemPerPage])
    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h1 className="text-center font-semibold text-2xl mb-10 text-red-600">Total Count : {count}</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
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
            <div className=" mt-10 mb-10 ">
                    <p>Current Page {currentPage}</p>
                <div className="flex gap-4 items-center ml-4">
                <div >
                    <button onClick={handlePrevPage} className="p-4 btn">prev</button>
                 {
                    pages.map( (page,idx) => <button 
                    onClick={() => setCurrentPage(page)} 
                    className={currentPage === page && 'btn btn-primary mb-10 text-white p-4 ml-2  bg-red-600'}
                     key={idx}>
                        {page}
                        </button>)
                 }
                 <button onClick={handleNextPage} className="p-4 btn">next</button>
                 </div>
                 <select name="" value={itemPerPage} onChange={handleItemPerPage} id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                 </select>
                </div>
           </div>
        </div>
    );
};

export default Home;