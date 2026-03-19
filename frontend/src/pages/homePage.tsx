import HeroSection  from "../components/home/heroSeccion";
import ProductsSeccion from "../components/home/productsSeccion";
import { AboutMe } from "../components/home/aboutMe";

const HomePage : React.FC  = () => {
    return (
        <>
        <HeroSection/>
        <ProductsSeccion />
        <AboutMe />
        </>
    )
}
export default HomePage;