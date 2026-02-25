import HeroSection  from "../components/home/heroSeccion";
import { AboutMe } from "../components/home/aboutMe";

const HomePage : React.FC  = () => {
    return (
        <>
        <HeroSection/>
        <AboutMe />
        </>
    )
}
export default HomePage;