"use client"
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

// const fetcher = async (url) => {
//     const response = await fetch(url);
//     return response.json();
// };


const Products = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [gpios, setGpios] = useState([]);
    const [newGPIO, setNewGPIO] = useState({ name: '', pin: '' })
    const resetNewGPIO = () => {
        setNewGPIO({ name: '', pin: '' });
    }

    const cartRef = useRef(null);
    // setProducts(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/gpios');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                setGpios(data);
                console.log(gpios);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const submit = async (e) => {
        
        var exit = false;
        
        gpios.forEach(gpio => {
            if(gpio.pin == newGPIO.pin){
                alert("Pin already exists")
                exit = true;
            }
        });
        
        if (exit) {
            return;
        }
        
        fetch('/api/gpios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGPIO)
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setGpios([...gpios, data]);
                resetNewGPIO();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    const toggleGPIO = async (pin, state) => {
        fetch('/api/gpios/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin, state })
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setGpios(gpios.map(gpio => gpio.pin == pin ? {...gpio, state} : gpio));
        })
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

    }, []);
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };



    return (
        <div>

            <Navbar toggleCart={toggleCart} ></Navbar>


            <main className="bg-gray-100 ">

                <div className='min-h-screen flex flex-col justify-center items-center'>
                    <h1 className="text-3xl text-gray-700 font-bold mb-8">GPIOs</h1>
                    <div className="my-12 flex flex-wrap justify-center gap-4">

                        {gpios.map((gpio) => {
                            return (
                                <div key={gpio._id} className='h-48 w-64 p-5 bg-gray-500 rounded-xl mb-4 flex flex-col'>
                                    <h1 className='text-4xl text-center font-medium mb-2 m-auto'>{gpio.name}</h1>
                                    <div className='flex flex-row justify-between items-center m-auto w-full px-10'>
                                        <p className='text-gray-300'>GPIO {gpio.pin}</p>
                                        <p className={`text-lg ${gpio.state == '1' ? 'text-green-500' : 'text-red-500'}`}>
                                            {gpio.state == '1' ? 'ON' : 'OFF'}
                                        </p>
                                    </div>
                                    <button className={`px-4 py-2  m-auto text-white rounded ${gpio.state == '1' ? 'bg-red-500' : 'bg-green-500'}`}
                                        onClick={() => { toggleGPIO(gpio.pin, gpio.state == '1'? '0':'1') }}>
                                        Turn {gpio.state == '1' ? 'OFF' : 'ON'}
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </main>

            <div ref={cartRef} className={`fixed top-0 right-0 bg-white lg:w-[32rem] w-64 h-full overflow-y-auto transition-transform duration-300 transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <header className="bg-gray-800 text-white py-4 px-6">
                    <h2 className="text-lg font-semibold">Add New GPIO </h2>
                </header>
                <div className="p-4 flex flex-col">

                    <div className="flex-grow"></div>
                    <div className='mt-auto bg-white text-white py-4 px-6 flex flex-col justify-end h-max'>
                        <form action="">
                            <div className='flex flex-col my-7 '>
                                <div className='flex flex-row justify-center mb-5'>
                                    <label className='text-gray-700 text-lg mr-10' htmlFor="name">Name:</label>
                                    <input className='text-gray-800 border-gray-500' type="text" name="name" id="name" placeholder="Enter Name" value={newGPIO.name} onChange={(e) => { setNewGPIO({ ...newGPIO, name: e.target.value }) }} />
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <label className='text-gray-700 text-lg mr-10 ' htmlFor="pin">Pin No:</label>
                                    <input className='text-gray-800 border-gray-500' type="number" name="pin" id="pin" placeholder="0" value={newGPIO.pin} onChange={(e) => { setNewGPIO({ ...newGPIO, pin: e.target.value }) }} />
                                </div>
                            </div>
                        </form>

                        <div className="p-4 ">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md m-auto w-full text-xl" onClick={submit} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Products;
