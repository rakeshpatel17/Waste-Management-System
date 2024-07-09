import React, { useEffect } from 'react';
import { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Button } from '@mui/material';
const steps = ['Waste Scheduled', 'In Progress', 'Completed'];

const StepIconComponent = (props) => {
  const { active, completed } = props;

  if (completed) {
    return <CheckCircleIcon />;
  }

  return <RadioButtonUncheckedIcon />;
};


const ProgressBar = ({ currentStep }) => {
  return (
    <Box sx={{ width: '100%', margin: 'auto' }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIconComponent}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

function AdminProgress({cid,count}) {
  const [currentStep, setCurrentStep] = useState(count); 
  const id = {count:currentStep}
  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); 
  };
  useEffect(() => {
    fetch(`http://localhost:4000/api/collections/${cid}`, {
      method: "PUT",
      body: JSON.stringify(id), 
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data);
      setCurrentStep(currentStep)
    }).catch((error) => {
      console.error('Error:', error);
    });
  }, [handleNext]); 
  

    
  

  
    return (
      <div className="App">
        <ProgressBar currentStep={currentStep} />
        <Box mt={2}>
            <center>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentStep === 3}
          >
            Next
          </Button>
          </center>
        </Box>
      </div>
    );
  }

  export default AdminProgress;