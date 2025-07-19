import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from '../NAV/Nav'
import Findjobs from '../Components/Findjobs'
import ForEmployers from '../Components/ForEmployers'
import JobBlogs from '../Components/JobBlogs'
import Contact from '../Components/Contact'
import PostJob from '../DataManage/PostJob'
import NavComp from '../NAV/NavComp'
import JobHome from '@/HOME/JobHome'
import JobDetails from '@/Components/JobDetails'
import Favouritejobs from '@/Components/Favouritejobs'
import JobApplicationForm from '@/DataManage/JobApplicationForm'
import ApplicantDetails from '@/DataManage/ApplicantDetails'
import ApplicationDetails from '@/DataManage/ApplicationDetails'
const Layout = () => {
  return (
    <div>
      <BrowserRouter>
      <Nav></Nav>
      <Routes>
        
        <Route path='/' element={<JobHome></JobHome>}></Route>
        <Route path='/findjobs' element={<Findjobs></Findjobs>}></Route>
        <Route path='/foremployers' element={<ForEmployers></ForEmployers>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/postjob' element={<PostJob></PostJob>}></Route>
        <Route path='/navcomp' element={<NavComp></NavComp>}></Route>
        <Route path='/step2back' element={<PostJob></PostJob>}></Route>
        <Route path='/favouritejobs' element={<Favouritejobs></Favouritejobs>}></Route>
        <Route path='/jobdetails/:id' element={<JobDetails></JobDetails>}></Route>
        <Route path='/jobapplicantiondetails' element={<ApplicationDetails></ApplicationDetails>}></Route>
        <Route path='/jobapplicationform' element={<JobApplicationForm></JobApplicationForm>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Layout
