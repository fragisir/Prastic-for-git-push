import React from 'react'
import Navbar from '@/components/navebar'
import Home from '@/components/home'
import Product from '@/components/product'

export default function page() {
  return (
    <div className="min-h-screen bg-background">
      
      <Navbar>
        
        </Navbar>    
        
          <Home/>
      <Product/>
      
    </div>
  )
}
