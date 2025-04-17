
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PassCard } from "@/components/PassCard";
import { PASS_TYPES } from "@/utils/passUtils";

export default function SelectPassPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">Select Your Bus Pass</h1>
        <p className="text-center text-gray-600 mb-8">Choose the pass that best fits your travel needs</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <PassCard 
            title={PASS_TYPES.oneday.title}
            duration={PASS_TYPES.oneday.duration}
            price={PASS_TYPES.oneday.price}
            features={PASS_TYPES.oneday.features}
            type="oneday"
          />
          
          <PassCard 
            title={PASS_TYPES.onemonth.title}
            duration={PASS_TYPES.onemonth.duration}
            price={PASS_TYPES.onemonth.price}
            features={PASS_TYPES.onemonth.features}
            type="onemonth"
          />
          
          <PassCard 
            title={PASS_TYPES.threemonths.title}
            duration={PASS_TYPES.threemonths.duration}
            price={PASS_TYPES.threemonths.price}
            features={PASS_TYPES.threemonths.features}
            type="threemonths"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
