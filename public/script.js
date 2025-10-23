let bookings = [];
const baseurl = "/booking";
let editingId = null;

async function fetchBookings() {
  try {
    const response = await axios.get(baseurl);
    bookings = response.data;
    renderBookings(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}

function renderBookings(data) {
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";

  data.forEach((booking) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition";
    li.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">${booking.name}</p>
        <p class="text-gray-500 text-sm">${booking.email} | ${booking.phone}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="startEdit(${booking.id})" class="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Edit</button>
        <button onclick="deleteBooking(${booking.id})" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    `;
    bookingList.appendChild(li);
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) return alert("All fields are required");

  const bookingData = { name, email, phone };

  try {
    if (editingId) {
      await axios.put(`${baseurl}/${editingId}`, bookingData);
      editingId = null;
    } else {
      await axios.post(baseurl, bookingData);
    }

    document.getElementById("bookingForm").reset();
    fetchBookings();
  } catch (error) {
    console.error("Error saving booking:", error);
  }
}

function startEdit(id) {
  const booking = bookings.find((b) => b.id == id);
  if (!booking) return;

  document.getElementById("name").value = booking.name;
  document.getElementById("email").value = booking.email;
  document.getElementById("phone").value = booking.phone;
  editingId = id;
}

async function deleteBooking(id) {
  try {
    await axios.delete(`${baseurl}/${id}`);
    fetchBookings();
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}

// Load bookings on page start
fetchBookings();
