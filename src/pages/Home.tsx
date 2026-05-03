import { Box } from "@mui/material"
import Hero from "../components/Hero"
import TrendingSection from "../components/TrendingSection";
import PopularSection from "../components/PopularSection";
import { useMovieContext } from "../context/MovieContext";
import { useEffect } from "react";

const Home = () => {
  const {setSearchQuery, setShowSearch} = useMovieContext()

  useEffect(()=>{
    setSearchQuery("");
    setShowSearch(false);
  },[setSearchQuery, setShowSearch]);
  
  return (
    <Box>
        <Hero/>
        <TrendingSection />
        <PopularSection />
    </Box>
  )
}

export default Home