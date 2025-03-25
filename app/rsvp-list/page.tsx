// app/rsvp-list/page.tsx
import { supabase } from "../../supabaseClient";

export default async function RsvpListPage() {
  // Fetch RSVP data from Supabase
  const { data: rsvps, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(rsvps);

  if (error) {
    console.error("Error fetching RSVPs:", error);
    return <div>Error loading RSVPs. Please try again later.</div>;
  }

  // Calculate the total number of guests
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.num_guests, 0);

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <h1 className="text-4xl font-bold text-[#9D67C3] mb-8">RSVP List</h1>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Names
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Number of Guests
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Notes
              </th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-200">
            {rsvps.map((rsvp) => (
              <tr
                key={rsvp.id}
                className="hover:bg-purple-50 transition-colors"
              >
                <td className="px-6 py-4 ">{rsvp.names}</td>
                <td className="px-6 py-4 ">{rsvp.num_guests}</td>
                <td className="px-6 py-4 ">{rsvp.notes || "-"}</td>
                <td className="px-6 py-4 ">{rsvp.email}</td>
              </tr>
            ))}
            {/* Total Guests Row */}
            <tr className="bg-purple-100 font-semibold">
              <td className="px-6 py-4 ">Total Guests</td>
              <td className="px-6 py-4 ">{totalGuests}</td>
              <td className="px-6 py-4 "></td>
              <td className="px-6 py-4 "></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
