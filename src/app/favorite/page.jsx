'use client'
import React from 'react'
import { useFavorite } from '../Hooks/useFavorite'
import useUser from '../Hooks/useUser'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeInfo } from 'lucide-react'
import { TbCoinTaka } from 'react-icons/tb'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import { MdAutoDelete } from 'react-icons/md'
import { useCart } from '../Hooks/useCart'

export default function FavoritePage() {
    const user = useUser()
    const { addToCart } = useCart(user);
    const { favorites, loading, removeFavorite } = useFavorite(user)
    console.log(favorites)
    if(loading) return <p className='text-center pt-22'>Loading...</p>
    return (
        <div className='pt-22'>
            <div className='grid md:grid-cols-2  lg:grid-cols-4 container mx-auto gap-4 mb-12'>
                {
                    favorites.map((food) => (
                        <div key={food._id} className='shadow-md rounded transition-all duration-500 hover:scale-105 p-4'>
                            <Image
                                width={600}
                                height={200}
                                src={food?.foodId?.image}
                                alt='image'
                                className='w-full p-4 h-40 object-cover transition-all duration-500 hover:scale-105'
                            />
                            <div className='flex justify-between'>
                                <h1 className='text-xl font-semibold text-gray-500'>{food.foodId.title}</h1>
                            <button onClick={()=> removeFavorite(food?.foodId)} className='text-xl mr-3 text-red-500'><MdAutoDelete /></button>
                            </div>
                            <Link href={`/FoodDetails/${food.foodId._id}`}>
                                <p className="text-blue-400 flex items-center gap-1 hover:underline text-sm">
                                    See info
                                    <BadgeInfo size={16} />
                                </p>
                            </Link>
                            <div className='flex justify-between text-gray-400 mx-2'>
                                <p className='flex items-center gap-1 text-gray-800 font-semibold'>{food.foodId.price} <TbCoinTaka /><span className='line-through text-red-400'>{food.foodId.oldPrice}</span></p>
                                <p className='flex items-center gap-1 '><FaStar className='text-yellow-500'></FaStar>{food.foodId.rating}</p>
                               
                            </div>
                             <div className='flex justify-center mx-4'>
                                <button onClick={() => addToCart(food.foodId)} className='flex px-4 py-2 items-center gap-2 rounded-sm bg-green-500 hover:bg-green-700 cursor-pointer text-white font-semibold'>Add to Cart <FaShoppingCart></FaShoppingCart></button>
                                
                             </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}
