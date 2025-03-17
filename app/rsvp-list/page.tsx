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
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Submitted On
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-200">
            {rsvps.map((rsvp) => (
              <tr
                key={rsvp.id}
                className="hover:bg-purple-50 transition-colors"
              >
                <td className="px-6 py-4 text-[#9D67C3]">{rsvp.names}</td>
                <td className="px-6 py-4 text-[#9D67C3]">{rsvp.num_guests}</td>
                <td className="px-6 py-4 text-[#9D67C3]">
                  {rsvp.notes || "-"}
                </td>
                <td className="px-6 py-4 text-[#9D67C3]">
                  {new Date(rsvp.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
