"use client";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center py-10 w-full bg-neutral-50 min-h-screen">

      
      <section className="w-full py-10 text-center text-black bg-gradient-to-r from-green-100 to-green-50">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </section>

      
      <section className="w-full max-w-5xl bg-white p-10 shadow-md rounded-lg mt-10 mb-20">
        <div className="grid md:grid-cols-2 gap-10">

          
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">
              Ask how we can help you:
            </h3>

            <div>
              <h4 className="font-semibold">See our platform in action</h4>
              <p className="text-gray-600 text-sm">
                Thank you for using Agrored, let us know how we can help you.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Wholesale purchases and sales</h4>
              <p className="text-gray-600 text-sm">
                We aim for you to have the best experience with your wholesale purchases or sales.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Explore life at Agrored</h4>
              <p className="text-gray-600 text-sm">
                We aim for our users to have the best experience using Agrored.
              </p>
            </div>
          </div>
          
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent 🚀");
            }}
          >
            <p className="text-sm text-gray-500">
              Please note: all fields are required.
            </p>

            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Your Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Your Message</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Write your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#55A605] text-white py-2 px-4 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>

        </div>
      </section>
    </main>
  );
}