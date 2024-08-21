import EmployeeNavbar from "./EmployeeNavbar"
import { useNavigate } from "react-router-dom"
const EmployeeUI = ({empData})=>{
    const navigate = useNavigate('')
    const handleClick=()=>{
        navigate('/employeenotification' ,{ state: { employee: empData._id } })
    }
    return(
        <>
            <EmployeeNavbar/>
            <h1 className="mt-3 text-center">Employee Dashboard</h1>
            <div className='container p-5 '>
                <div className='container d-flex justify-content-center' style={{ gap: '1rem' }}>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{width: "18rem" }}>
                        <div className='card-body p-5'>
                            <h5 className='card-title'><button className="btn" onClick={handleClick}>Notifications</button></h5>
                            <p className='card-text my-2'></p>
                        </div>
                    </div>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{width: "18rem" }}>
                        <div className='card-body p-5'>
                            <h5 className='card-title'>Earnings</h5>
                            <p className='card-text my-2'></p>
                        </div>
                    </div>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{width: "18rem" }}>
                        <div className='card-body p-5'>
                            <h5 className='card-title'>Earnings</h5>
                            <p className='card-text my-2'></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeUI