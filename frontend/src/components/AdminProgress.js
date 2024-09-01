import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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

function AdminProgress({ cid, count }) {
  const [currentStep, setCurrentStep] = useState(count);

  useEffect(() => {
    if (count < steps.length - 1) {
      fetch(`http://localhost:4000/api/collections/${cid}`, {
        method: 'PUT',
        body: JSON.stringify({ count: currentStep }), 
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.assignedEmpId && currentStep < 2) {
            setCurrentStep(currentStep + 1); // Update only if the condition is met
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [currentStep, cid]);

  useEffect(() => {
    setCurrentStep(count); // Sync local state with the prop `count`
  }, [count]);

  return (
    <div>
      <ProgressBar currentStep={currentStep} />
    </div>
  );
}

export default AdminProgress;
