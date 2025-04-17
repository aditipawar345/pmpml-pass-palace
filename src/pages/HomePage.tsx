
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bus, Calendar, CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-pmpml-red to-red-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PMPML Online Pass Booking
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Travel conveniently across Pune with digital bus passes. Apply online and get your pass instantly.
            </p>
            <Link to="/select-pass">
              <Button className="bg-white text-pmpml-red hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-bold">
                Apply for Bus Passes
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose PMPML Online Passes?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                <div className="bg-red-100 text-pmpml-red p-3 rounded-full inline-flex mb-4">
                  <Bus size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Convenient Travel</h3>
                <p className="text-gray-600">
                  Unlimited travel on all PMPML buses across Pune and Pimpri-Chinchwad.
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                <div className="bg-red-100 text-pmpml-red p-3 rounded-full inline-flex mb-4">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Cost Effective</h3>
                <p className="text-gray-600">
                  Save money with our economical pass options for daily, monthly, and quarterly travel.
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all">
                <div className="bg-red-100 text-pmpml-red p-3 rounded-full inline-flex mb-4">
                  <Calendar size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Flexible Options</h3>
                <p className="text-gray-600">
                  Choose from daily, monthly, or quarterly passes based on your travel needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Your PMPML Pass?</h2>
            <Link to="/select-pass">
              <Button className="bg-pmpml-red hover:bg-red-700 text-white">
                Apply Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
