
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  booking_id: number;
  user_name: string;
  aadhar_number: string;
  address: string;
  pass_id: number;
  booking_date: string;
  expiry_date: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load booking data. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-pmpml-red">
              Admin Dashboard - Pass Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-pmpml-red border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading booking data...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No bookings found. Once users start booking passes, they will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>User Name</TableHead>
                      <TableHead>Aadhar Number</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Pass ID</TableHead>
                      <TableHead>Booking Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.booking_id}>
                        <TableCell>{booking.booking_id}</TableCell>
                        <TableCell>{booking.user_name}</TableCell>
                        <TableCell>XXXX-XXXX-{booking.aadhar_number.slice(-4)}</TableCell>
                        <TableCell>{booking.address}</TableCell>
                        <TableCell>{booking.pass_id}</TableCell>
                        <TableCell>{formatDate(booking.booking_date)}</TableCell>
                        <TableCell>{formatDate(booking.expiry_date)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
