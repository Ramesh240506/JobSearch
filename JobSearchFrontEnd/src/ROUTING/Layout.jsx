import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Nav from '../NAV/Nav'
import Findjobs from '../Components/Findjobs'
import Contact from '../Components/Contact'
import PostJob from '../DataManage/PostJob'
import JobHome from '@/HOME/JobHome'
import JobDetails from '@/Components/JobDetails'
import Favouritejobs from '@/Components/Favouritejobs'
import JobApplicationForm from '@/DataManage/JobApplicationForm'
import ApplicationDetails from '@/DataManage/ApplicationDetails'
import JobBoardAuth from '@/Authentication/JobBoardAuth'
import ViewApplicants from '@/DataManage/ViewApplicants'
import UserProfile from '@/Profile/UserProfile'
import SearchResults from '@/Features/SearchResults'
import ProfileDetails from '@/DataManage/ProfileDetails'
import ProtectedRoute from './ProtectedRoute'
import ViewAppliedStatus from '@/Profile/ViewAppliedStatus'
import AppliedUserDetails from '@/Profile/AppliedUserDetails'
const Layout = () => {

  const location=useLocation();

  const isAuthPage = location.pathname !== '/';
  return (
    <div>
    
      {isAuthPage && <Nav></Nav>}
      <Routes>
        
        <Route path='/' element={<JobBoardAuth></JobBoardAuth>}></Route>
        <Route path='/userprofile' element={<ProtectedRoute><UserProfile></UserProfile></ProtectedRoute>}></Route>
        <Route path='/jobhome' element={<ProtectedRoute><JobHome></JobHome></ProtectedRoute>}></Route>
       
        <Route path='/findjobs' element={<ProtectedRoute><Findjobs></Findjobs></ProtectedRoute>}></Route>
        <Route path='/contact' element={<ProtectedRoute><Contact></Contact></ProtectedRoute>}></Route>
        <Route path='/postjob' element={<ProtectedRoute allowedRoles={['POSTER']}><PostJob></PostJob></ProtectedRoute>}></Route>
     
        <Route path='/favouritejobs' element={<ProtectedRoute><Favouritejobs></Favouritejobs></ProtectedRoute>}></Route>
        <Route path='/jobdetails/:id' element={<ProtectedRoute allowedRoles={['SEEKER']}><JobDetails></JobDetails></ProtectedRoute>}></Route>
        <Route path='/jobapplicantiondetails' element=
        {<ProtectedRoute><ApplicationDetails></ApplicationDetails></ProtectedRoute>}></Route>

        <Route path='/jobapplicationform/:id' element={<ProtectedRoute allowedRoles={['SEEKER']}><JobApplicationForm></JobApplicationForm></ProtectedRoute>}></Route>
        <Route path='/viewapplicants/:jobid' element={<ProtectedRoute><ViewApplicants></ViewApplicants></ProtectedRoute>}></Route>
        
        <Route path='/searchresults/:keyword' element={<ProtectedRoute><SearchResults></SearchResults></ProtectedRoute>}></Route>
        <Route path='/userdetails' element={<ProtectedRoute><ProfileDetails></ProfileDetails></ProtectedRoute>}></Route>
        <Route path='/viewappliedstatus/:id' element={<ProtectedRoute><ViewAppliedStatus></ViewAppliedStatus></ProtectedRoute>}></Route>
        <Route path='/applieduserdetails/:jobid/:id' element={<ProtectedRoute><AppliedUserDetails></AppliedUserDetails></ProtectedRoute>}></Route> 
          
          </Routes>
      
    </div>
  )
}

export default Layout
