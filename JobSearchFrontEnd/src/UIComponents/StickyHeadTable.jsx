import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Typography, Button
} from '@mui/material';
import { useState } from 'react';
import { getAllApplicants, getAllJobs } from '@/Services/JobService';
import { useEffect } from 'react';
import { format } from 'date-fns';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'appliedDate',
    label: 'Applied Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 150,
    align: 'right',
  },
];



// Example row creation function
function createData(name, email, appliedDate) {
  return { name, email, appliedDate };
}


// Sample rows
// const rows = [

//   createData('Ramesh Kumar', 'ramesh@example.com', '2025-07-30'),
//   createData('Priya Singh', 'priya@example.com', '2025-07-29'),
//   createData('Anil Gupta', 'anil@example.com', '2025-07-28'),
//   createData('John Doe', 'john@example.com', '2025-07-25'),
//   createData('Sara Khan', 'sara@example.com', '2025-07-24'),
// ];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);
  const [rows,setRows]=useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    getApplicants();
  },[])

  const getApplicants=async()=>{
      const response=await getAllApplicants();
      try
      {
          const applicants=response.data.map((applicant)=>(
              createData(applicant.firstName,applicant.email,format(new Date(applicant.appliedAt), 'dd MMM yyyy'))
          ));
          console.log("Response from backend",response)
          setRows(applicants);
      }
      catch(err)
      {
          console.log(err);
      }
  }


  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        p: 2,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: '#f9fafb',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Applications List
      </Typography>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    backgroundColor: '#e2e8f0',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={idx}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0fdf4',
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="right">{row.appliedDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => alert(`Viewing ${row.name}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => alert(`Deleting ${row.name}`)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
