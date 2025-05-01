// app/rsvp-list/page.tsx
import { supabase } from "../../supabaseClient";

export default async function RsvpListPage() {
  // Fetch RSVP data from Supabase
  const { data: rsvps, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, 1000);

  if (error) {
    console.error("Error fetching RSVPs:", error);
    return <div>Error loading RSVPs. Please try again later.</div>;
  }

  // Calculate the total number of guests (only for attending RSVPs)
  const totalGuests = rsvps.reduce(
    (sum, rsvp) => (rsvp.declined ? sum : sum + rsvp.num_guests),
    0
  );

  // Calculate attendance counts WITH GUESTS
  const attendanceStats = {
    partyOnly: rsvps.reduce(
      (sum, rsvp) =>
        !rsvp.declined && rsvp.party && !rsvp.movie
          ? sum + rsvp.num_guests
          : sum,
      0
    ),
    movieOnly: rsvps.reduce(
      (sum, rsvp) =>
        !rsvp.declined && rsvp.movie && !rsvp.party
          ? sum + rsvp.num_guests
          : sum,
      0
    ),
    both: rsvps.reduce(
      (sum, rsvp) =>
        !rsvp.declined && rsvp.party && rsvp.movie
          ? sum + rsvp.num_guests
          : sum,
      0
    ),
    declined: rsvps.reduce(
      (sum, rsvp) => (rsvp.declined ? sum + rsvp.num_guests : sum),
      0
    ),
  };

  // Function to display attendance status
  const getAttendanceStatus = (rsvp: {
    declined: boolean;
    party: boolean;
    movie: boolean;
  }) => {
    if (rsvp.declined) return "Declined";
    if (rsvp.party && rsvp.movie) return "Both";
    if (rsvp.party) return "Party Only";
    if (rsvp.movie) return "Movie Only";
    return "Not Specified";
  };

  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-4xl font-bold text-[#9D67C3] mb-8">RSVP List</h1>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-purple-700 font-bold">Party Only</h3>
          <p className="text-2xl">{attendanceStats.partyOnly}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-purple-700 font-bold">Movie Only</h3>
          <p className="text-2xl">{attendanceStats.movieOnly}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-purple-700 font-bold">Both Events</h3>
          <p className="text-2xl">{attendanceStats.both}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-purple-700 font-bold">Declined</h3>
          <p className="text-2xl">{attendanceStats.declined}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Names
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Attendance
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Guests
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-200">
            {rsvps.map((rsvp) => (
              <tr
                key={rsvp.id}
                className="hover:bg-purple-50 transition-colors"
              >
                <td className="px-6 py-4">{rsvp.names}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      rsvp.declined
                        ? "bg-gray-200 text-gray-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {getAttendanceStatus(rsvp)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {rsvp.declined ? "-" : rsvp.num_guests}
                </td>
                <td className="px-6 py-4">{rsvp.email}</td>
                <td className="px-6 py-4 max-w-xs whitespace-normal">
                  {rsvp.notes || "-"}
                </td>
              </tr>
            ))}
            {/* Total Guests Row */}
            <tr className="bg-purple-100 font-semibold">
              <td className="px-6 py-4">Total Attending Guests</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">{totalGuests}</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
