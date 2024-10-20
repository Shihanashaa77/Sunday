import React, { useEffect, useState } from 'react';
import { Box, Grid2, Typography, TextField } from "@mui/material";
import Navuser from './Navuser';
import Jobcard from '../components/Jobcard';
import useGetjobs from '../hooks/useGetjobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice.js';

const Browsejobs = () => {
  const [filter, setFilter] = useState('');
  useGetjobs();

  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Filter the job listings based on the filter input
  const filteredJobs = allJobs?.filter(job =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  return (
    <>
      <header>
        <Navuser />
        <br /><br /><br />
      </header>

      <main style={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            height: "100%",
            padding: "0.75rem",
            margin: "1.25rem 0 1.25rem 1.25rem",
            border: "1px solid black",
            borderRadius: "0.5rem",
            minWidth: "33ch",
            minHeight: "80dvh"
          }}
        >
          <Typography variant="h5">Job filters</Typography>
          <TextField
            variant="outlined"
            label="Filter by job title"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ marginTop: '1rem' }}
          />
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            flexGrow: 1,
            height: "100%",
            padding: "1rem",
            mt: "0.25rem",
          }}
        >
          <Grid2 container spacing={2}>
            {
              filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Grid2 key={job._id}>
                    <Jobcard job={job} />
                  </Grid2>
                ))
              ) : (
                <Typography>No jobs found</Typography>
              )
            }
          </Grid2>
        </Box>
      </main>
    </>
  );
};

export default Browsejobs;
