import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from './components/Profile';
import ScheduleWaste from './components/ScheduleWaste';
import Dashboard from './components/Dashboard';
import IssueReport from './components/IssueReport'
import DisplayWaste from './components/DisplayWaste'
import DisplayIssues from './components/DisplayIssues';
import AdminDashboard from './components/AdminDashboard';
import AllUsers from './components/AllUsers';
import AllWastes from './components/AllWastes';
import AllIssues from './components/AllIssues'
import Contactus from './components/Contactus';
import ProgressBars from './components/ProgressBar';
import PostUI from './components/PostUI';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData,setUserData] = useState('')
  const [scheduled,setSchedule] = useState(0);
  const [issue, setIssue] = useState([]);
  const [complaint,lodgeComplaint] = useState(0);
  const [complaintData,getComplaintData] = useState('')
  const [pending, setPending] = useState(0);
  useEffect(()=>{
    fetch(`http://localhost:4000/api/collections/${userData.uid}`).then((response)=>response.json()).then((data)=>setSchedule(data.length))
    fetch(`http://localhost:4000/api/issues/${userData.uid}`).then((response)=>response.json()).then((data)=>{
      lodgeComplaint(data.length)
      getComplaintData(data)
  })
  if (isLoggedIn) {
    const pendingCount = complaintData.filter(issues => issues.status === "Pending").length;
    setPending(pendingCount);
}
  },[isLoggedIn,userData,complaintData])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData} />
              <Login setIsLoggedIn={setIsLoggedIn} setUserData = {setUserData}/>
              <Footer />
            </>
          } />
          <Route path="/" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <Home isLoggedIn={isLoggedIn} setUserData = {setUserData} userData={userData}/>
              <Footer />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} />
              <Signup setIsLoggedIn={setIsLoggedIn} setUserData = {setUserData}/>
              <Footer />
            </>
          } />
          <Route path="/logout" element={
              <Logout setIsLoggedIn={setIsLoggedIn} />
          } />
          <Route path="/profile" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <Profile userData={userData} setUserData = {setUserData}/>
              <Footer />
            </>
          }/>
          <Route path="/schedulewaste" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <ScheduleWaste isLoggedIn={isLoggedIn} userData={userData} scheduled={scheduled} setSchedule={setSchedule}/>
              <Footer />
            </>
          }/>
          <Route path="/dashboard" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <Dashboard isLoggedIn={isLoggedIn} scheduled={scheduled} complaint={complaint} userData={userData} pending={pending}/>
              <Footer />
            </>
          }/>
          <Route path="/getWaste" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <DisplayWaste isLoggedIn={isLoggedIn} userData={userData} scheduled={scheduled} setSchedule={setSchedule} lodgeComplaint={lodgeComplaint}/>
              <Footer />
            </>
          }/>
          <Route path="/issuereport" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <IssueReport isLoggedIn={isLoggedIn} userData={userData} complaint={complaint} lodgeComplaint={lodgeComplaint}/>
              <Footer />
            </>
        }/>
        <Route path="/displayissues" element={
            <>
              <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <DisplayIssues isLoggedIn={isLoggedIn} userData={userData} complaint={complaint} lodgeComplaint={lodgeComplaint} issue={issue} setIssue={setIssue}/>
              <Footer />
            </>
        }/>
        <Route path="/admin" element={
            <>
              <AdminDashboard />
            </>
        }/>
        <Route path="/allusers" element={
            <>
              <AllUsers/>
            </>
        }/>
        <Route path="/allwastes" element={
            <>
              <AllWastes/>
            </>
        }/>
        <Route path="/allissues" element={
            <>
              <AllIssues/>
            </>
        }/>
        <Route path="/contactus" element={
            <>
            <Navbar isLoggedIn={isLoggedIn} userData={userData}/>
              <Contactus/>
              <Footer />
            </>
        }/>
        <Route path="/progress" element={
            <>
            <ProgressBars/>
            </>
        }/>
        <Route path="/post" element={
            <>
            <PostUI/>
            </>
        }/>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;