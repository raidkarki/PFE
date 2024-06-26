import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

export default function Landing() {
  return (
 <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Manage Your Classroom Environment
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Our classroom environment management system helps teachers easily manage the tools and resources needed
                for practical classes, including programming, web development, and database subjects. Containerized
                environments ensure a consistent and reliable setup.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-900  dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to={"auth"}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
  <div className="container px-4 md:px-6">
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
      <img
        alt="Classroom Environment"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        height="310"
        src="https://res.cloudinary.com/djphukdzt/image/upload/v1717942231/PracticeSetsLaunchBlogHeader_qWp.width-1200.format-webp_je7k31.webp"
        width="550"
      />
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-blue-300 px-3 py-1 text-sm dark:bg-blue-200">
            Classroom Management
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
            Streamline Your Practical Classes
          </h2>
          <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
            Our classroom environment management system provides a containerized setup for all the tools and
            resources needed by teachers during practical classes, ensuring a consistent and reliable experience
            for students.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-50"
            href="#idd"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
  
      <section id='idd' className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Supported Subjects and Tools
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our classroom environment management system supports a wide range of subjects and tools, ensuring that
              teachers have the resources they need for their practical classes.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 lg:gap-12 [&>img]:mx-auto">
            <img
              alt="Programming"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/c_scale,w_85/v1717940651/2621040_ldxpzt.png"
              width="140"
            />
            <img
              alt="Python"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/v1717940717/pythonicon_whzzn9.png"
              width="140"
            />
            <img
              alt="Databases"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/c_scale,w_97/v1717940256/9850812_gfxoys.png"
              width="140"
            />
         
            <img
              alt="Node.js"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/v1715033043/skn5eqxculuf1a1ukkw0.png"
              width="140"
            />
            <img
              alt="Java"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/c_scale,w_71/v1717940280/t%C3%A9l%C3%A9charger_oaa0qa.png"
              width="140"
            />
            <img
              alt="PostgreSQL"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/v1716578652/glu3gcdwn10wfv46tk2y.png"
              width="140"
            />
               <img
              alt="MongoDB"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/v1715033791/rkvxbayanoygujcrnvkr.png"
              width="140"
            />
               <img
              alt="MongoDB"
              className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              height="70"
              src="https://res.cloudinary.com/djphukdzt/image/upload/v1715032767/ekcrpwjh8quj3q0k4sjz.png"
              width="140"
            />
            
          </div>
        </div>
      </section>
    </>
  )
}
