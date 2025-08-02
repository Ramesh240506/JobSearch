import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import ApplicationDetails from '@/DataManage/ApplicationDetails'
import JobBoardAuth from '@/Authentication/JobBoardAuth'
import ViewApplicants from '@/DataManage/ViewApplicants'
import UserProfile from '@/DataManage/UserProfile'
const Layout = () => {

  const location=useLocation();

  const isAuthPage = location.pathname !== '/';
  return (
    <div>
    
      {isAuthPage && <Nav></Nav>}
      <Routes>
        
        <Route path='/' element={<JobBoardAuth></JobBoardAuth>}></Route>
        <Route path='/userprofile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/jobhome' element={<JobHome></JobHome>}></Route>
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
        <Route path='/viewapplicants' element={<ViewApplicants></ViewApplicants>}></Route>
      </Routes>
      
    </div>
  )
}

export default Layout
