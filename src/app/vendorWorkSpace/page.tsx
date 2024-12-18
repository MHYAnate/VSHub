"use client"
import React, { useState } from 'react'
import AboutVendor from '@/components/workShop/about';
import Header from '@/components/workShop/header';
import MainTab from '@/components/workShop/mainTab';
import DetailHead from '@/components/workShop/detail';
import VendorStaffsComponent from '@/components/workShop/staff';
import Reviews from '@/components/workShop/reviews';
import VendorServicesComponent from '@/components/workShop/services';
import VendorVacanciesComponent from '@/components/workShop/vacancy';
import FooterComponent from '@/components/footer/footerComponent';


export default function Component() {

  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">

        <Header/>

      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">

          <DetailHead/>
          
            <div className="border-t border-gray-200">

              <MainTab activeTab={activeTab} setActiveTab={setActiveTab}/>

              <div className="px-4 py-5 sm:p-6">
                {activeTab === 'about' && (

                 <AboutVendor/>

                )}

                {activeTab === 'services' && (

                  <VendorServicesComponent/>

                )}

                {activeTab === 'staff' && (

                  <VendorStaffsComponent id=''/>

                )}

                {activeTab === 'reviews' && (

                  <Reviews/>

                )}

                {activeTab === 'vacancies' && (

                 <VendorVacanciesComponent/>

                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow sm:rounded-lg">

            <FooterComponent/>
            
          </div>
        </div>
      </main>
    </div>
    
  )
};