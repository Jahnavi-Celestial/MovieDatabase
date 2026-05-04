import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  Chip,
  Stack,
  Typography,
  Box,
  Slider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchGenres } from "../api/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Filters{
  sort_by: string,
  with_genres: string,
  "vote_average.gte": number,
  "vote_average.lte": number,
  "vote_count.gte": number,
}

interface Genre{
  id: number,
  name: string
}

const SidebarFilter = ({setFilters, initialSort,}: {setFilters: (filters: Filters) => void; initialSort: string;}) => {
  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [score, setScore] = useState<number[]>([1, 10]);
  const [votes, setVotes] = useState<number>(0);
  const [sortBy, setSortBy] = useState(initialSort);

  const handleGenreClick = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    const query = {
      sort_by: sortBy,
      with_genres: selectedGenres.join(","),
      "vote_average.gte": score[0],
      "vote_average.lte": score[1],
      "vote_count.gte": votes,
    };

    setFilters(query);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Accordion sx={{ borderRadius: "8px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sort</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Sort Results By
          </Typography>
          <Select
            fullWidth
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
          >
            {initialSort.startsWith("popularity") && [
                <MenuItem key="pop-desc" value="popularity.desc">Popularity Descending</MenuItem>,
                <MenuItem key="pop-asc" value="popularity.asc">Popularity Ascending</MenuItem>
            ]}

            {initialSort.startsWith("vote_average") && [
                <MenuItem key="vote-desc" value="vote_average.desc">Rating Descending</MenuItem>,
                <MenuItem key="vote-asc" value="vote_average.asc">Rating Ascending</MenuItem>
            ]}
          </Select>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded sx={{ borderRadius: "8px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Genres
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {genres.map((genre: Genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                clickable
                onClick={() => handleGenreClick(genre.id)}
                color={
                  selectedGenres.includes(genre.id) ? "primary" : "default"
                }
                variant={
                  selectedGenres.includes(genre.id) ? "filled" : "outlined"
                }
                size="small"
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Typography>User Score</Typography>
      <Slider
        value={score}
        onChange={(_, value) => setScore(value as number[])}
        valueLabelDisplay="auto"
        min={1}
        max={10}
      />

      <Typography>Minimum Votes</Typography>
      <Slider
        value={votes}
        onChange={(_, value) => setVotes(value as number)}
        valueLabelDisplay="auto"
        min={0}
        max={5000}
      />

      <Button variant="contained" fullWidth onClick={handleApply}>
        Apply Filters
      </Button>
    </Stack>
  );
};

export default SidebarFilter;
