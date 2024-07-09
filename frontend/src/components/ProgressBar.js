import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const steps = ['Waste Scheduled', 'In Progress', 'Completed'];

const StepIconComponent = (props) => {
  const { completed } = props;

  if (completed) {
    return <CheckCircleIcon />;
  }

  return <RadioButtonUncheckedIcon />;
};

const ProgressBar = ({ currentStep }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto' }}>
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIconComponent}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

function ProgressBars({ count }) {
  return (
    <div className="App">
      <ProgressBar currentStep={count} />
    </div>
  );
}

export default ProgressBars;
