import Image from "next/image"

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-20">


        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
              Empowering the fields to grow through the power of connection
            </h2>
            <p className="text-gray-600">
              At Agrored, we believe in the power of the land and the importance 
              of those who work it. We are a network that connects producers, 
              distributors, and consumers, driving sustainable solutions that 
              strengthen agriculture and improve the quality of life in rural 
              communities.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/connecting-teams_nnjy.svg" 
              alt="About Us Illustration"
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/team.svg" 
              alt="Mission Illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our mission
            </h2>
            <p className="text-gray-600">
              Our mission is to bring together knowledge, innovation, and 
              opportunities to make agriculture a driver of development. We are 
              committed to transparency, collaboration, and respect for the 
              environment, knowing that the future depends on what we sow today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
              Our vision
            </h2>
            <p className="text-gray-600">
              To become the leading network that transforms agriculture into a 
              sustainable, innovative, and inclusive engine of growth, empowering 
              rural communities and fostering a stronger connection between people 
              and the land.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/design-inspiration.svg" 
              alt="Vision Illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>

      </div>
    </main>
  )
}