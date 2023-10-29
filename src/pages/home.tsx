import Banner from "../components/banner";

const IMAGE = {
  name: "banner",
  filePath: "images/banner.jpg",
  title: "COFFEE SHOP",
  description: "every coffee in the world",
};

function Home() {
  return (
    <div>
      <section className='relative w-full h-96'>
        <Banner IMAGE={IMAGE} objectFit='object-cover' />
      </section>
      <div>
        <h1>HomePage</h1>
      </div>
    </div>
  );
}

export default Home;
